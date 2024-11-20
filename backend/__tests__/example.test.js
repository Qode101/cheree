const request = require('supertest');
const app = require('../server'); 

describe('GET /api', () => {
  it('should return a 200 status', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
  });
});


const request = require('supertest');
const app = require('../server'); 

describe('GET /api', () => {
  it('should return a response from the API', async () => {
    const response = await request(app).get('/api/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('From API route'); 
  });
});