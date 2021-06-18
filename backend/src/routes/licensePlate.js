'use strict';

const express = require('express');
const router = express.Router();

const LicensePlateController = require('../controllers/licensePlate');

router.get('/', LicensePlateController.list); // List all licensePlates
router.post('/', LicensePlateController.create); // Create new licensePlate
router.get('/:licensePlateId', LicensePlateController.read); // Read a licensePlate by Id
router.put(
    '/:licensePlateId',
    // middlewares.checkAuthentication,
    LicensePlateController.update
); // Update a licensePlate by Id
router.delete(
    '/:licensePlateId',
    // middlewares.checkAuthentication,
    LicensePlateController.remove
); // Delete a licensePlate by Id

module.exports = router;
