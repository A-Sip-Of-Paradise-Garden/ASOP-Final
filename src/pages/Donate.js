import asopImage from "../assets/home/asop_img1.png";
import React from "react";

const DonationPage = () => (
    <section>
        <div className={"align-center"}>
            <img
                src={asopImage}
                alt=""
            />
        </div>
        <form action="http://localhost:4000/create-donate-checkout-session" method="POST">
            <button className="donateButton">
                Donate!
            </button>
        </form>
    </section>
);

export default DonationPage