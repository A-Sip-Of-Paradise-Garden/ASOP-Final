import React from 'react';
import venmoImage from "../assets/home/venmo.png";

const DonationPage = () => {
    return (
        <section>
            <div className="donate-layout">
                <p>
                    <strong>Please help us grow our community. Your donations are greatly appreciated!</strong>
                </p>
                <p>
                    Your support and contributions will enable us to meet our vision for bartenders to grow food, <br/>
                    herbs, and flowers for themselves and their families to help transform their wellness and happiness.
                </p>
                <form action="http://localhost:4000/create-donate-checkout-session" method="POST">
                    <button className="donateButton">
                        Donate!
                    </button>
                </form>
                <p>
                    <strong>CashApp:</strong> $Asipofparadisegarden
                </p>
                <p>
                    <strong>Venmo:</strong> @asipofparadisegarden
                </p>
                <p>
                    <strong>PayPal:</strong> asipofparadisegarden@gmail.com
                </p>
                <img src={venmoImage} alt="Venmo"/>
            </div>
            <div>
                <h2>With your help, we can do these things:</h2>
                <ul className="donate-list">
                    <li>$15 Rakes</li>
                    <li>$15 Shovels</li>
                    <li>$30 Wind Chime</li>
                    <li>$50 Bird Feeder</li>
                    <li>$50 Plant Markers</li>
                    <li>$75 Bird Feeder</li>
                    <li>$75 Sponsor a membership</li>
                    <li>$125 Solar Walkway Lights</li>
                    <li>$175 Push Lawn Mower with Grass Catcher</li>
                    <li>$200 Electric Tiller</li>
                    <li>$225 Electric Leaf Blower with Bag</li>
                    <li>$250 Annual Shrubs and Flowers</li>
                    <li>$275 Annual Vegetables, Fruits, and Herbs</li>
                    <li>$300 Large Ceramic Planters</li>
                    <li>$300 Garden Stools</li>
                    <li>$300 Park Style Benches</li>
                    <li>$400 Cafe String Lights and Lanterns</li>
                    <li>$400 Fire Pit</li>
                    <li>$500 Garden Borders</li>
                    <li>$500 Volunteer Day</li>
                    <li>$4,500 Full Month of Programming</li>
                    <li>$10 - $100,000 Investment into our 2 newest property developments</li>
                </ul>
            </div>
        </section>
    );
};

export default DonationPage;
