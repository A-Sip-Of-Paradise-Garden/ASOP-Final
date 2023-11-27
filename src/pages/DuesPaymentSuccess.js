import asopImage from "../assets/home/asop_img3.png";
import React from "react";
import { UserAuth } from "../context/AuthContext";

import "../App.css"

const DuesPaymentSuccess = () => {
    const { _, userProfile } = UserAuth();


    if (!userProfile) {
        return <div>Loading...</div>;
    }
    const { name } = userProfile;

    return (
        <section>
            <h1>Thanks {name} For Paying Your Dues!</h1>
            <div className={'align-center'}>
                <img
                    src={asopImage}
                    alt=""
                />
            </div>
        </section>
    );
};

export default DuesPaymentSuccess;
