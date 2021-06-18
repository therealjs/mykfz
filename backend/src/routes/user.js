'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.get('/', UserController.list); // List all users
router.post('/', UserController.create); // Create a new user
router.get('/:userId', UserController.read); // Read a user by Id
router.put('/:userId', UserController.update); // Update a user by Id
router.delete('/:userId', UserController.remove); // Delete a user by Id

// license plate reservations
router.get(
    '/:userId/licensePlateReservations',
    UserController.listLicensePlateReservations
); // List all licensePlate Reservations for a user
router.post(
    '/:userId/licensePlateReservations',
    // middlewares.checkAuthentication,
    UserController.createLicensePlateReservation
); // Create a new licensePlateReservation for specified user

module.exports = router;
