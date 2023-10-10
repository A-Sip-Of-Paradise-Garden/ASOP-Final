import React from 'react';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm";

const STRIPE_PUBLISHABLE_KEY = "pk_test_51NzCAnH1uLXX7HqDvudMTico7f1ruDjjqn4d6wQ1PBEp6PGRpWDT0U7HeY9A6Iu3ykwwmEojGCbw2OTx8Q9F5spb00JhQgAqGg"

const stripeTestPromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}