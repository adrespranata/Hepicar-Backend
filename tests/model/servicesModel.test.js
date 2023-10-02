const ServiceModel = require('../../src/model/servicesModel');
const dbPool = require('../../src/config/database');

// Mock database pool
jest.mock('../../src/config/database', () => {
    return {
        execute: jest.fn(),
        query: jest.fn()
    };
});

describe('ServiceModel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all services', async () => {
        const mockData = [{ id: 1, name: 'Service 1' }, { id: 1, name: 'Service 2' }];
        dbPool.execute.mockResolvedValue([mockData]);
        const result = await ServiceModel.getAllServices();
        expect(result).toEqual([mockData]);
    });

    it('should create a new service', async () => {
        const mockData = {
            name: 'New Service',
            description: 'Description',
            currency: 'USD',
            price: 100
        };
        dbPool.query.mockResolvedValue({ insertId: 1 });
        const result = await ServiceModel.createNewService(mockData);
        expect(result.insertId).toEqual(1);
    });

    it('should update a service', async () => {
        const mockData = {
            name: 'Updated Service',
            description: 'Updated Description',
            currency: 'USD',
            price: 200
        };
        const serviceId = 1;
        dbPool.query.mockResolvedValue({ affectedRows: 1 });
        const result = await ServiceModel.updateService(mockData, serviceId);
        expect(result.affectedRows).toEqual(1);
    });

    it('should delete a service', async () => {
        const serviceId = 1;
        dbPool.query.mockResolvedValue({ affectedRows: 1 });
        const result = await ServiceModel.deleteService(serviceId);
        expect(result.affectedRows).toEqual(1);
    });
});
