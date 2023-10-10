import StripeContainer from "../components/StripeContainer";
import '../App.css';

// TODO add more page elements perhaps a shopping cart design? Discuss with team/key.
const Payment = () => {
    return (
        <div className="App">
            <h1>ASOP Community Connect Payments Page</h1>
            <StripeContainer />
        </div>
    );
};

export default Payment;