const servicesController = require("../../src/controller/servicesController");
const ServiceModel = require("../../src/model/servicesModel");

jest.mock("../../src/model/servicesModel", () => {
  return {
    getAllServices: jest.fn(),
    createNewService: jest.fn(),
    updateService: jest.fn(),
    deleteService: jest.fn(),
  };
});

describe("servicesController", () => {
  describe("getAllServices", () => {
    it("should return all services", async () => {
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

      ServiceModel.getAllServices.mockResolvedValue([mockData]);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(), // Add mockReturnThis here
        json: jest.fn(),
      };

      await servicesController.getAllServices(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Get all services success",
        data: mockData,
      });
    });

    it("should handle errors", async () => {
      ServiceModel.getAllServices.mockRejectedValue(
        new Error("An error occurred")
      );

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(), // Add mockReturnThis here
        json: jest.fn(),
      };

      await servicesController.getAllServices(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        serverMessage: expect.any(Error),
      });
    });
  });

  describe("createNewService", () => {
    it("should create a new service", async () => {
      const mockRequest = {
        body: {
          name: "New Service",
          description: "New Description",
          currency: "USD",
          price: 50,
        },
      };

      ServiceModel.createNewService.mockResolvedValue({});

      const req = mockRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await servicesController.createNewService(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Create new services success",
        data: mockRequest.body,
      });
    });

    it("should handle errors", async () => {
      ServiceModel.createNewService.mockRejectedValue(
        new Error("An error occurred")
      );

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await servicesController.createNewService(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        serverMessage: expect.any(Error),
      });
    });
  });

  describe("updateService", () => {
    it("should update a service", async () => {
        const mockRequest = {
          params: {
            id: 1, // Ganti dengan ID yang sesuai
          },
          body: {
            name: "Updated Service",
            description: "Updated Description",
            currency: "USD",
            price: 75,
          },
        };
      
        ServiceModel.updateService.mockResolvedValue({});
      
        const req = mockRequest;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        await servicesController.updateService(req, res);
      
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "Update services success",
          data: {
            id: mockRequest.params.id,
            ...mockRequest.body,
          },
        });
      });
      
      it("should handle errors", async () => {
        const mockError = new Error("An error occurred");
        ServiceModel.updateService.mockRejectedValue(mockError);
      
        const mockRequest = {
          params: {
            id: 1, // Ganti dengan ID yang sesuai
          },
          body: {
            name: "Updated Service",
            description: "Updated Description",
            currency: "USD",
            price: 75,
          },
        };
      
        const req = mockRequest;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        await servicesController.updateService(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Server error",
          serverMessage: mockError,
        });
      });
      
  });

  describe("deleteService", () => {
    it("should delete a service", async () => {
      const mockRequest = {
        params: {
          id: 1, // Ganti dengan ID yang sesuai
        },
      };
  
      ServiceModel.deleteService.mockResolvedValue({});
  
      const req = mockRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await servicesController.deleteService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: "Delete services success",
        data: null,
      });
    });
  
    it("should handle errors", async () => {
      const mockError = new Error("An error occurred");
      ServiceModel.deleteService.mockRejectedValue(mockError);
  
      const mockRequest = {
        params: {
          id: 1, // Ganti dengan ID yang sesuai
        },
      };
  
      const req = mockRequest;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await servicesController.deleteService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        serverMessage: mockError,
      });
    });
  });
});
