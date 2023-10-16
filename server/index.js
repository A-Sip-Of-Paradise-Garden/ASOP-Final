// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NzCAnH1uLXX7HqDddON5TMYIMPilELy0YPFJCQn6ZG4Uu5gByy7z0pFbBC66RYZ8EOiv' +
    '9Rk2g4TtS1NRbyaHlwo00Z1z0YPaN');
const express = require('express');
const app = express();
app.use(express.static('public'));
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post('/create-checkout-session', cors(),async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Price ID is obtained from the stripe dashboard
                price: 'price_1O1ky9H1uLXX7HqD5P0ueCGh',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://example.com/`,
        cancel_url: `https://example.com/`,
    });

    res.redirect(303, session.url);
});

app.listen( 4000, () => {
    console.log("Sever is listening on port 4000")
})