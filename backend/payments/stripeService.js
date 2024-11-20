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
