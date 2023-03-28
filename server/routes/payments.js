const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || require('../config/stripe').STRIPE_SECRET_KEY);

router.post('/charge', async (req, res) => {
  const { amount, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'cad',
      description: 'Online Cafe Payment',
      source: token.id,
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment failed', error });
  }
});

module.exports = router;