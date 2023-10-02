const request = require('supertest');
const express = require('express');
const servicesRoutes = require('../../src/routes/servicesRoute');
const servicesController = require('../../src/controller/servicesController');

// Mock servicesController functions
jest.mock('../../src/controller/servicesController', () => ({
  getAllServices: jest.fn(),
}));

const app = express();
let server;
// Use only the GET route in your Express app
app.use('/services', servicesRoutes);
beforeAll(async () => {
  server = await app.listen(3002);
});

afterAll(async () => {
  await server.close();
});
describe('Unit Test for GET /services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all services', async () => {
    // Define mock data
    const mockData = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        currency: 'USD',
        price: 100,
      },
      {
        id: 2,
        name: 'Service 2',
        description: 'Description 2',
        currency: 'USD',
        price: 200,
      },
    ];

    // Mock the behavior of getAllServices
    servicesController.getAllServices.mockResolvedValue({
      message: 'Get all services success',
      data: mockData,
    });

    // Send a GET request to /services
    const response = await request(app).get('/services');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Get all services success',
      data: mockData,
    });
  }, 10000);

  it('should handle errors', async () => {
    // Mock the behavior of getAllServices to simulate an error
    servicesController.getAllServices.mockRejectedValue(new Error('An error occurred'));

    // Send a GET request to /services
    const response = await request(app).get('/services');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Server error',
      serverMessage: expect.any(String),
    });
  }, 10000);
});
