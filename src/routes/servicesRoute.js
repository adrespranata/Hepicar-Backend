const express = require('express');

const servicesController = require('../controller/servicesController')

const router = express.Router();

// READ - Method GET
router.get('/', servicesController.getAllServices);
// CREATE - Method POST
router.post('/', servicesController.createNewService);
// UPDATE - Method PUT
router.put('/:id', servicesController.updateService);
// DELETE - Methode DELETE
router.delete('/:id', servicesController.deleteService);

module.exports = router;