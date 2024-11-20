const nock = require('nock');

beforeAll(() => {
  nock('https://api.stripe.com')
    .post('/v1/payment_intents')
    .reply(200, { id: 'pi_123', status: 'succeeded' });

  nock('https://sandbox.safaricom.co.ke')
    .post('/mpesa/stkpush/v1/processrequest')
    .reply(200, { ResponseCode: '0' });
});