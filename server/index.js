// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NzCAnH1uLXX7HqDddON5TMYIMPilELy0YPFJCQn6ZG4Uu5gByy7z0pFbBC66RYZ8EOiv' +
    '9Rk2g4TtS1NRbyaHlwo00Z1z0YPaN');
const express = require('express');
const app = express();
app.use(express.static('public'));
const cors = require("cors")
const bodyParser = require("body-parser")

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccount.json');

initializeApp({
    credential: cert(serviceAccount),
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({type: "*/*"}))
app.use(bodyParser.json())

app.use(cors())

app.post('/create-donate-checkout-session', cors(), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Price ID is obtained from the stripe dashboard
                price: 'price_1O1ky9H1uLXX7HqD5P0ueCGh',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://www.asop.site/donation-payment-success`,
        cancel_url: `https://www.asop.site/payment`,
    });

    res.redirect(303, session.url);
});

app.post('/create-dues-checkout-session', cors(),async (req, res) => {
    const userId = req.body.userId; // Retrieve the user ID from the request
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Price ID is obtained from the stripe dashboard
                price: 'price_1O7DWfH1uLXX7HqDtAE10Sq7',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://www.asop.site/dues-payment-success`, // Change based on hosted url
        cancel_url: `https://www.asop.site`,  // Change based on hosted url
        metadata: {userId}
    });

    res.redirect(303, session.url);
});

const endpointSecret = "whsec_2cebb8a846dc3335ee2a86a7b571fc6e8018de26a93e5438d3e96840df487eb2";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err)
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const dataObject = event.data.object;
            console.log("💰 Payment captured!");
            const userId = dataObject.metadata.userId
            console.log(`Payment captured for user ${userId}`);
            const db = getFirestore();
            const currentDate = new Date();
            const memberUntilDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

            const userRef = db.collection('user-profiles').doc(userId);
            await userRef.update({
                memberUntil: memberUntilDate,
                duesPaid: true
            });

            console.log("firestore worked?")


            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});
app.listen( 4000, () => {
    console.log("Sever is listening on port 4000")
})
