'use strict';

const express = require('express');
const router = express.Router();

const PlateReservationController = require('../controllers/plateReservation');

router.get('/', PlateReservationController.list); // List all plateReservations
router.post('/', PlateReservationController.create); // List all plateReservations

module.exports = router;
