'use strict';

const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    district: {
        type: String,
        required: true
    },
    zipCode: String,
    city: String,
    street: String,
    houseNumber: String
});

module.exports = { AddressSchema }