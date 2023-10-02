const request = require("supertest");
const express = require("express");
const servicesRoutes = require("../../src/routes/servicesRoute");
const servicesController = require("../../src/controller/servicesController");

// Mock servicesController functions
jest.mock("../../src/controller/servicesController", () => ({
  getAllServices: jest.fn(),
  createNewService: jest.fn(),
  updateService: jest.fn(),
  deleteService: jest.fn(),
}));

const app = express();
let server;
// Use only the GET route in your Express app
app.use("/services", servicesRoutes);

beforeAll(async () => {
  server = await app.listen(3002);
});

afterAll(async () => {
  await server.close();
});

describe("Unit Test for GET /services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all services", async () => {
    // Define mock data
    const mockData = [
      {
        id: 1,
        name: "Service 1",
        description: "Description 1",
        currency: "USD",
        price: 100,
      },
      {
        id: 2,
        name: "Service 2",
        description: "Description 2",
        currency: "USD",
        price: 200,
      },
    ];

    // Mock the behavior of getAllServices
    servicesController.getAllServices.mockResolvedValue({
      message: "Get all services success",
      data: mockData,
    });

    // Send a GET request to /services
    const response = await request(app).get("/services");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Get all services success",
      data: mockData,
    });
  }, 10000);

  it("should handle errors", async () => {
    // Mock the behavior of getAllServices to simulate an error
    servicesController.getAllServices.mockRejectedValue(
      new Error("An error occurred")
    );

    // Send a GET request to /services
    const response = await request(app).get("/services");

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Server error",
      serverMessage: expect.any(String),
    });
  }, 10000);
});
describe("Unit Test for POST /services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new service", async () => {
    // Define mock request data
    const mockRequestData = {
      name: "New Service",
      description: "New Description",
      currency: "USD",
      price: 50,
    };

    // Mock the behavior of createNewService
    servicesController.createNewService.mockResolvedValue({
      message: "Create new service success",
      data: mockRequestData,
    });

    // Send a POST request to /services
    const response = await request(app).post("/services").send(mockRequestData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Create new service success",
      data: mockRequestData,
    });
  }, 10000);

  it("should handle errors", async () => {
    // Mock the behavior of createNewService to simulate an error
    servicesController.createNewService.mockRejectedValue(
      new Error("An error occurred")
    );

    // Send a POST request to /services
    const response = await request(app).post("/services");

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Server error",
      serverMessage: expect.any(String),
    });
  }, 10000);
});
describe("Unit Test for PUT /services/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a service", async () => {
    // Define mock request data
    const mockRequestData = {
      name: "Updated Service",
      description: "Updated Description",
      currency: "USD",
      price: 75,
    };

    // Mock the behavior of updateService
    servicesController.updateService.mockResolvedValue({
      message: "Update service success",
      data: mockRequestData,
    });

    // Send a PUT request to /services/1 (replace 1 with the actual ID)
    const response = await request(app)
      .put("/services/1")
      .send(mockRequestData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Update service success",
      data: mockRequestData,
    });
  }, 10000);

  it("should handle errors", async () => {
    // Mock the behavior of updateService to simulate an error
    servicesController.updateService.mockRejectedValue(
      new Error("An error occurred")
    );

    // Send a PUT request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).put("/services/1");

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Server error",
      serverMessage: expect.any(String),
    });
  }, 10000);
});
describe("Unit Test for DELETE /services/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a service", async () => {
    // Mock the behavior of deleteService
    servicesController.deleteService.mockResolvedValue({});

    // Send a DELETE request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).delete("/services/1");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual(null);
  }, 10000);

  it("should handle errors", async () => {
    // Mock the behavior of deleteService to simulate an error
    servicesController.deleteService.mockRejectedValue(
      new Error("An error occurred")
    );

    // Send a DELETE request to /services/1 (replace 1 with the actual ID)
    const response = await request(app).delete("/services/1");

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Server error",
      serverMessage: expect.any(String),
    });
  }, 10000);
});
