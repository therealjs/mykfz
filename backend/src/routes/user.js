'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.get('/', UserController.list); // List all usrs
router.post('/', UserController.create); // Create a new use
router.get('/:userId', UserController.read); // Read a user by Id
router.put('/:userId', UserController.update); // Update a user by Id
router.delete('/:userId', UserController.remove); // Delete a user by Id

module.exports = router;
