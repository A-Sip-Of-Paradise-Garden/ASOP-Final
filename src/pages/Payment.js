import StripeContainer from "../components/StripeContainer";
import '../App.css';

const Payment = () => {
    return (
        <div className="CardInput">
            <h1>ASOP Community Connect Payments Page</h1>
            <StripeContainer />
        </div>
    );
};

export default Payment;