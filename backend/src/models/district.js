'use strict';

const mongoose = require('mongoose');

// Define the District schema
const DistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kfz: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

DistrictSchema.set('versionKey', false);

// Export the District model
module.exports = mongoose.model('District', DistrictSchema);
