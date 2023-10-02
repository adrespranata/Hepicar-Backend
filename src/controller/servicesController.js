const ServiceModel = require('../model/servicesModel')

const getAllServices = async (req, res) => {
    try {
        const [data] = await ServiceModel.getAllServices();
        res.status(200).json({
            message: 'Get all services success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error
        })
    }
}

const createNewService = async (req, res) => {
    const {body} = req;

    try {
        await ServiceModel.createNewService(body);
        res.status(201).json({
            message: 'Create new services success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error
        })
    }
}

const updateService = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try {
        await ServiceModel.updateService(body, id);
        res.status(201).json({
            message: 'Update services success',
            data: {
                id: id,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error
        })
    }
}

const deleteService = async (req, res) => {
    const {id} = req.params;
    try {
        await ServiceModel.deleteService(id);
        res.status(204).json({
            message: 'Delete services success',
            data: null
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error
        })
    }
}

module.exports = {
    getAllServices,
    createNewService,
    updateService,
    deleteService
}