'use strict';

const mongoose = require('mongoose');

// Define the PlateReservation schema
const PlateReservationSchema = new mongoose.Schema({
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    combination: {
        type: String,
        // validate: /^[A-Z]{1,3}-[A-Z]{1,2} [0-9]{1,4}$/,
        required: true,
        unique: true
    },
    expiration: {
        type: Date,
        required: true
    }
});

PlateReservationSchema.set('versionKey', false);

// Export the PlateReservation model
module.exports = mongoose.model('PlateReservation', PlateReservationSchema);
