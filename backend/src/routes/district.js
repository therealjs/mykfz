'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const DistrictController = require('../controllers/district');

router.get('/', DistrictController.list); // List all districts
router.get('/:districtId', DistrictController.read); // Read a district by Id
router.put(
    '/:districtId',
    // middlewares.checkAuthentication,
    DistrictController.update
); // Update a district by Id

module.exports = router;
