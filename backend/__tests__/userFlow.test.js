const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('./mocks/userModel');
const Product = require('./mocks/productModel');
const Purchase = require('./mocks/purchaseModel');

describe('User Flow', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Clean up the database after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should sign up, create a product, and make a purchase', async () => {
    // Sign up
    const signUpResponse = await request(app).post('/api/sign-up').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    expect(signUpResponse.statusCode).toBe(200);

    // Create a product
    const productResponse = await request(app).post('/products/create').send({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
      category: 'categoryId',
      stock: 10
    });
    expect(productResponse.statusCode).toBe(201);
    const productId = productResponse.body._id;

    // Make a purchase
    const purchaseResponse = await request(app).post('/purchase/add').send({
      user: signUpResponse.body.userId,
      products: [{ product: productId, quantity: 1 }],
      amount: 100
    });
    expect(purchaseResponse.statusCode).toBe(201);
  });

  describe('User Authentication', () => {
    it('should log in a user', async () => {
      // Assuming a user is already signed up
      const loginResponse = await request(app).post('/api/login').send({
        email: 'john@example.com',
        password: 'password123'
      });
      expect(loginResponse.statusCode).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
    });

    it('should fail to log in with incorrect credentials', async () => {
      const loginResponse = await request(app).post('/api/login').send({
        email: 'john@example.com',
        password: 'wrongpassword'
      });
      expect(loginResponse.statusCode).toBe(401);
    });
  });
}); 