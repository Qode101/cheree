const request = require('supertest');
const app = require('../server');

describe('User Flow', () => {
  it('should sign up and make a purchase', async () => {
    // Sign up
    const signUpResponse = await request(app).post('/api/sign-up').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    expect(signUpResponse.statusCode).toBe(200);

    // Make a purchase
    const purchaseResponse = await request(app).post('/purchase/add').send({
      user: signUpResponse.body.userId,
      products: [{ product: 'productId', quantity: 1 }],
      amount: 100
    });
    expect(purchaseResponse.statusCode).toBe(201);
  });
}); 