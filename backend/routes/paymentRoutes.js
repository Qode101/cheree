const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../payments/stripeService');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await createPaymentIntent(amount);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await confirmPayment(paymentIntentId);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
