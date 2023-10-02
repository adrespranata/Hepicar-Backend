const request = require('supertest');
const express = require('express');
const servicesRoutes = require('../../src/routes/servicesRoute');
const servicesController = require('../../src/controller/servicesController');

// Mock servicesController functions
jest.mock('../../src/controller/servicesController', () => ({
  updateService: jest.fn(),
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
// Use only the PUT route in your Express app
app.use('/services', servicesRoutes);

describe('Unit Test for PUT /services/:id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a service', async () => {
    // Define mock request data
    const mockRequestData = {
      name: 'Updated Service',
      description: 'Updated Description',
      currency: 'USD',
      price: 75,
    };

    // Mock the behavior of updateService
    servicesController.updateService.mockResolvedValue({
      message: 'Update service success',
      data: mockRequestData,
    });

    // Send a PUT request to /services/1 (replace 1 with the actual ID)
    const response = await request(app)
      .put('/services/1')
      .send(mockRequestData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Update service success',
      data: mockRequestData,
    });
  }, 10000);

  it('should handle errors', async () => {
    // Mock the behavior of updateService to simulate an error
    servicesController.updateService.mockRejectedValue(new Error('An error occurred'));

    // Send a PUT request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).put('/services/1');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Server error',
      serverMessage: expect.any(String),
    });
  }, 10000);
});
