const nock = require('nock');
const stripe = require('stripe');
const { createPaymentIntent } = require('../payments/stripeService');

jest.mock('stripe');

beforeAll(() => {
  nock('https://api.stripe.com')
    .post('/v1/payment_intents')
    .reply(200, { id: 'pi_123', status: 'succeeded' });

  nock('https://sandbox.safaricom.co.ke')
    .post('/mpesa/stkpush/v1/processrequest')
    .reply(200, { ResponseCode: '0' });
});

describe('Stripe Payment Service', () => {
    it('should create a payment intent', async () => {
        const mockPaymentIntent = { client_secret: 'test_secret' };
        stripe.paymentIntents.create.mockResolvedValue(mockPaymentIntent);

        const amount = 1000; // $10.00
        const paymentIntent = await createPaymentIntent(amount);

        expect(paymentIntent).toEqual(mockPaymentIntent);
        expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
            amount,
            currency: 'usd',
        });
    });

    it('should throw an error if payment intent creation fails', async () => {
        stripe.paymentIntents.create.mockRejectedValue(new Error('Failed to create payment intent'));

        await expect(createPaymentIntent(1000)).rejects.toThrow('Failed to create payment intent');
    });
});