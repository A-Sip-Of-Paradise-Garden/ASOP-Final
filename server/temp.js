const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const admin = require('firebase-admin');

const app = express();
const port = 3001;

const serviceAccount = require('../asop-production-66c17151862f.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// sgMail.setApiKey('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');
sgMail.setApiKey('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');

app.use(cors());
app.use(express.json()); 

app.post('/send-email', async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const usersSnapshot = await admin.firestore().collection('user-profiles').where('notifications', '==', true).get();
    const notificationRecipients = usersSnapshot.docs.map((doc) => doc.data().email);

    if (notificationRecipients.length === 0) {
      return res.status(400).json({ error: 'No users with notification enabled.' });
    }
    console.log('notificationRecipients:', notificationRecipients);

    const { title, description } = eventDetails;

    const message = {
        to: notificationRecipients,
        from: 'asopgardenmanager@gmail.com',
        subject: `New Event: ${title}`,
        text: `A new event "${title}" was created. Check out ASOP's calendar for more details`,
        html: `
          <h1>A new event "${title}" was created. Check out ASOP's calendar for more details</h1>
          <div><span style="font-weight: bold;">Description:</span> ${description}</div>
          <div style="margin-top: 10px; margin-bottom: 20px; font-weight: bold;">Check out ASOP's calendar to RSVP while seats remain!</div>
          <div>- A Sip of Paradise Garden</div>
        `,
      };      

    await sgMail.send(message);

    return res.json({ message: 'Email sent!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
