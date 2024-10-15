"use client"
import React, { useState } from "react"
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"



const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message as string);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/checkout/succes`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occurred.");
        }

        setLoading(false);
    };


    const paymentElementOptions = {
        layout: "tabs" as const,
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={loading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {loading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {errorMessage && <div id="payment-message">{errorMessage}</div>}
            </form>

        </>
    )
}
export default Checkout;
