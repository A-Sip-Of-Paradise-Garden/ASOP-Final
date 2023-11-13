import asopImage from "../assets/home/asop_img3.png";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../App.css"

const DuesPaymentSuccess = () => {
    const { user, userProfile } = UserAuth();
    const [updateStatus, setUpdateStatus] = useState('');

    useEffect(() => {
        if (userProfile) {
            const updateMembership = async () => {
                try {
                    const userDocRef = doc(db, "user-profiles", user.uid);
                    const currentDate = new Date();
                    const memberUntilDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
                    await updateDoc(userDocRef,
                        {memberUntil: memberUntilDate,
                              paidDues: true}
                );
                } catch (error) {
                    console.error("Error updating firebase: ", error);
                    setUpdateStatus('Error updating member until date');
                }
            };
            updateMembership().then(r => updateStatus);
        }
    }, [userProfile]);

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
