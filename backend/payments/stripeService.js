const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment intent creation failed: ${error.message}`);
  }
};

const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment confirmation failed: ${error.message}`);
  }
};

const createCustomer = async (email, name, metadata = {}) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata
    });
    return customer;
  } catch (error) {
    throw new Error(`Customer creation failed: ${error.message}`);
  }
};

const attachPaymentMethod = async (customerId, paymentMethodId) => {
  try {
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    return paymentMethod;
  } catch (error) {
    throw new Error(`Payment method attachment failed: ${error.message}`);
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  createCustomer,
  attachPaymentMethod
};





// How this is gonna work:
// 1. create a payment intent on the (my) server.

// {
//     "id":"pi_1J6Jb8K....",
//     "amount":1099,
//     "status":"requires_payment_method",
//     "client_secret":"pi_1J6Jb8K...._secret_9V8l8Z....",

// }

// 2.Collect card details ===> obtain the payment method from the customer securely using Stripe.js, which handles credit card form creation and validation.
// 3. After submitting the form,combine the payment intent with credit card details and call Stripe's confirmCardPayment to attempt finalizing the payment
// 4. If the payment is successful, the payment intent status will be succeeded, and the client secret will no longer be valid.
// 5. If the payment fails, the payment intent status will be requires_payment_method, and the client secret will remain valid.