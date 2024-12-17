const request = require('supertest');
const app = require('../server');
<<<<<<< HEAD
=======
const Purchase = require('./mocks/purchaseModel');
>>>>>>> 30f35b0fda99e473994398c8ff5fc77f727e033b

describe('Purchase API', () => {
  it('should get all purchases', async () => {
    const response = await request(app).get('/purchase/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

<<<<<<< HEAD
=======
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

>>>>>>> 30f35b0fda99e473994398c8ff5fc77f727e033b
  //more tests for other endpoints will go here
}); 