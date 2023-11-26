import asopImage from "../assets/home/asop_img1.png";
import React from "react";
import { FiHeart } from "react-icons/fi";

const DonationPage = () => (
    <section>
        <div className={"align-center"}>
            <h1 className ="primary-heading">
            
                Donations

                <img
                    src={asopImage}
                    alt=""
                />

            
        <form className={"align-center" } action="http://localhost:4000/create-donate-checkout-session" method="POST" style={{ padding: "30px" }}>
            <button className="secondary-button">
                Donate Now!<FiHeart /> {" "} 
            </button>
        </form>
        </h1>
        </div>
    </section>
);

export default DonationPage