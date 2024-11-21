const request = require('supertest');
const app = require('../server');

describe('Purchase API', () => {
  it('should get all purchases', async () => {
    const response = await request(app).get('/purchase/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  //more tests for other endpoints will go here
}); 