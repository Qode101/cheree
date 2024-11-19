const request = require('supertest');
const app = require('../server'); // Change this line to point to server.js

describe('GET /api', () => {
  it('should return a 200 status', async () => {
    const response = await request(app).get('/api'); // Adjust the endpoint as needed
    expect(response.statusCode).toBe(200);
  });
});


const request = require('supertest');
const app = require('../server'); // Adjust this if your main file is named differently

describe('GET /api', () => {
  it('should return a response from the API', async () => {
    const response = await request(app).get('/api/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('From API route'); // Adjust based on your actual response
  });
});