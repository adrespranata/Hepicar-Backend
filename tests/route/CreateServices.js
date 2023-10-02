const request = require('supertest');
const express = require('express');
const servicesRoutes = require('../../src/routes/servicesRoute');
const servicesController = require('../../src/controller/servicesController');

// Mock servicesController functions
jest.mock('../../src/controller/servicesController', () => ({
  createNewService: jest.fn(),
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

describe('Unit Test for POST /services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new service', async () => {
    // Define mock request data
    const mockRequestData = {
      name: 'New Service',
      description: 'New Description',
      currency: 'USD',
      price: 50,
    };

    // Mock the behavior of createNewService
    servicesController.createNewService.mockResolvedValue({
      message: 'Create new service success',
      data: mockRequestData,
    });

    // Send a POST request to /services
    const response = await request(app)
      .post('/services')
      .send(mockRequestData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Create new service success',
      data: mockRequestData,
    });
  }, 10000);

  it('should handle errors', async () => {
    // Mock the behavior of createNewService to simulate an error
    servicesController.createNewService.mockRejectedValue(new Error('An error occurred'));

    // Send a POST request to /services
    const response = await request(app).post('/services');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Server error',
      serverMessage: expect.any(String),
    });
  }, 10000);
});
