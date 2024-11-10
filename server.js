const express = require('express');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Configure Sendinblue client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const sendWelcomeEmail = async (email) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = {
    to: [{ email }],
    sender: { email: 'hitesh0001beniwal@gmail.com', name: 'DEV@Deakin' },
    subject: 'Welcome to DEV@Deakin!',
    textContent: 'Thank you for subscribing to our daily insider!',
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

// Subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await sendWelcomeEmail(email);
    res.json({ message: 'Subscription successful, welcome email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Subscription successful, welcome email sent!' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
