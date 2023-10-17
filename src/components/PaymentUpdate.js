import React, { useState, useEffect } from "react";
import "../App.css";

const ProductDisplay = () => (
    <section >
            <div className={"align-center"}>
                <img
                    src="https://lh3.googleusercontent.com/p/AF1QipMybPsyRBFY5m0qpx3U0avHTyiD6M0iZ2zB17sb=s680-w680-h510"
                    alt="Image from Google, for some reason was having trouble with local images"
                />
            </div>
            <div>
                <h3>Donate Below!</h3>
            </div>
        <form action="http://localhost:4000/create-checkout-session" method="POST">
            <div className="button-container">
                <button className="donateButton">
                    Donate!
                </button>
            </div>
        </form>
    </section>
);

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function PaymentUpdate() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}