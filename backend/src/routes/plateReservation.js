'use strict';

const express = require('express');
const router = express.Router();

const PlateReservationController = require('../controllers/plateReservation');

router.get('/', PlateReservationController.list); // List all plateReservations
router.post('/', PlateReservationController.create); // Create new plateReservation
router.get('/:plateReservationId', PlateReservationController.read); // Read a plateReservation by Id
router.put(
    '/:plateReservationId',
    // middlewares.checkAuthentication,
    PlateReservationController.update
); // Update a plateReservation by Id
router.delete(
    '/:plateReservationId',
    // middlewares.checkAuthentication,
    PlateReservationController.remove
); // Delete a plateReservation by Id

module.exports = router;
