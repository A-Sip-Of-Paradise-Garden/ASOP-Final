import React, { useState, useEffect } from "react";
import "../App.css";
import DonationPage from "../pages/Donate";

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function PaymentHandler() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Payment finished! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Payment canceled -- Try again when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <DonationPage />
    );
}