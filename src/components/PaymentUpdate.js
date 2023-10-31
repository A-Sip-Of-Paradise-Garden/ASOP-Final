import React, { useState, useEffect } from "react";
import "../App.css";
import asopImage from '../assets/home/asop_img1.png';

const ProductDisplay = () => (
    <section>
            <div className={"align-center"}>
                <img
                    src={asopImage}
                    alt=""
                />
            </div>
        <div>
            <h3>Donate Below!</h3>
        </div>
        <form action="http://localhost:4000/create-checkout-session" method="POST">
            <button className="donateButton">
                Donate!
            </button>
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
        <ProductDisplay />
    );
}