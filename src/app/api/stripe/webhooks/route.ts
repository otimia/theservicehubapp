import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import Stripe from 'stripe';
import { SubscriptionType } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia',
    typescript: true,
});

export async function POST(req: Request) {

    const sig = req.headers.get('stripe-signature');
    const body = await req.text();


    try {
        const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

        console.log("Event: ", event.type)
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            // Verwerk succesvolle betaling of abonnement.
            const workspace = await db.workspace.findUnique({
                where: {
                    id: session?.metadata?.workspaceId,
                },
            });

            if (!workspace) {
                return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
            }

            const subscription = await db.subscription.create({
                data: {
                    workspaceId: session?.metadata?.workspaceId as string,
                    price: session?.amount_total?.toString(),
                    active: true,
                    priceId: session?.id,
                    customerId: workspace?.customerId,
                    currentPeriodEndDate: new Date(session?.expires_at * 1000),
                    subscritiptionId: session?.id,
                    type: session?.metadata?.type as SubscriptionType,
                },
            });
            console.log(subscription);
            return NextResponse.json({ received: true });
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.log(`Webhook error: ${err}`);
        return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
    }
}
