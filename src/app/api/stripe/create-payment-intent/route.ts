import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-09-30.acacia',
    typescript: true,
});

export async function POST(req: NextRequest) {
    try {
        const { amount, workspaceId } = await req.json();
        console.log("amount", amount)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertToSubcurrency(amount),
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
            metadata: {
                workspaceId: workspaceId
            }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        )
    }
}