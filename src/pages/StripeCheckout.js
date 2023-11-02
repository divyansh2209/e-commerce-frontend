import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";


const stripePromise = loadStripe("pk_test_51O6Y0tSGQDv4DTXPIElCMRCXL2S5ROcHlB8eXtmwA1cImPUTOFSx7nLOVhFklWGRP0HRoRbKlOnLHbqNy0Vl8RYN00x6rckiee");

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState("");
    const currentOrder = useSelector(selectCurrentOrder)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId: currentOrder.id }),

        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}