const sgMail = require('@sendgrid/mail');
const API_KEY = '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';

sgMail.setApiKey(API_KEY);

const message = {
  to: 'victorhugobatistela@gmail.com',
  from: 'asopgardenmanager@gmail.com',
  subject: 'Hello from ASOP',
  text: 'Hello, new event was created',
  html: '<h1>Hello, new event was created</h1>',
};

sgMail
  .send(message)
  .then(response => console.log('Email sent...'))
  .catch(error => console.log(error.message));