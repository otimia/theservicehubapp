"use client"
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '@/components/stripe/checkout';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        setConfirmed(false);
        fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: 15 })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [])



    const appearance = {
        theme: 'stripe' as const, // Zorg ervoor dat de type correct is
    }
    const options = {
        clientSecret: clientSecret,
        appearance: appearance,
    };

    // Zorg ervoor dat de stripePromise correct is geladen
    if (!stripePromise) {
        console.error("Stripe is not loaded");
        return null; // Of een fallback component renderen
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div>
                <h1>Checkout</h1>
            </div>
            <div>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        {confirmed ? <div>Transactie voltooid</div> : <Checkout />}
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default CheckoutPage
