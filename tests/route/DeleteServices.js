const request = require('supertest');
const express = require('express');
const servicesRoutes = require('../../src/routes/servicesRoute');
const servicesController = require('../../src/controller/servicesController');

// Mock servicesController functions
jest.mock('../../src/controller/servicesController', () => ({
  deleteService: jest.fn(),
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

// Use only the DELETE route in your Express app
app.use('/services', servicesRoutes);

describe('Unit Test for DELETE /services/:id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a service', async () => {
    // Mock the behavior of deleteService
    servicesController.deleteService.mockResolvedValue({});

    // Send a DELETE request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).delete('/services/1');

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual(null);
  }, 10000);

  it('should handle errors', async () => {
    // Mock the behavior of deleteService to simulate an error
    servicesController.deleteService.mockRejectedValue(new Error('An error occurred'));

    // Send a DELETE request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).delete('/services/1');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Server error',
      serverMessage: expect.any(String),
    });
  }, 10000);
});
