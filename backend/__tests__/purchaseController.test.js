const request = require('supertest');
const app = require('../server');
const Purchase = require('./mocks/purchaseModel');

describe('Purchase API', () => {
  it('should get all purchases', async () => {
    const response = await request(app).get('/purchase/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new purchase', async () => {
    const response = await request(app).post('/purchase/add').send({
      user: 'userId',
      products: [{ product: 'productId', quantity: 2 }],
      amount: 200
    });
    expect(response.statusCode).toBe(201);
  });

  it('should get a specific purchase by ID', async () => {
    const purchase = new Purchase({ user: 'userId', amount: 200 });
    await purchase.save();

    const response = await request(app).get(`/purchase/${purchase._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe(200);
  });

  //more tests for other endpoints will go here
}); 