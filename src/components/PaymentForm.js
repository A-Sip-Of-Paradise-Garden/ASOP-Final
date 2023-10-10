import React, {useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios"

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#fff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#ced5de" }
        },
        invalid: {
            iconColor: "#ced5de",
            color: "#ced5de"
        }
    }
}


export default function PaymentForm() {
    const [ success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const {id} = paymentMethod
                // TODO change the axios post url to an actual endpoint
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000, // this is the cost in pennies
                    id
                })
                if (response.data.success) {
                    console.log("successful payment!")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("error:", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ?
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button>Pay</button>
            </form>
                :
                <div>
                    <h2>Thanks for donating to ASOP Community Garden!</h2>
                </div>
            }
        </>
    )
}