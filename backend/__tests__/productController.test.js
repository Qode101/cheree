const request = require('supertest');
const app = require('../server');
const Product = require('./mocks/productModel');

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app).post('/products/create').send({
      name: 'New Product',
      price: 50,
      description: 'A new product',
      category: 'categoryId',
      stock: 20
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('New Product');
  });

  it('should get all products', async () => {
    const response = await request(app).get('/products/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a product', async () => {
    const product = new Product({ name: 'Update Product', price: 30 });
    await product.save();

    const response = await request(app).put(`/products/update/${product._id}`).send({
      price: 40
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.price).toBe(40);
  });

  it('should delete a product', async () => {
    const product = new Product({ name: 'Delete Product', price: 30 });
    await product.save();

    const response = await request(app).delete(`/products/delete/${product._id}`);
    expect(response.statusCode).toBe(200);
  });
}); 