'use strict';

const mongoose = require('mongoose');

// Define the PlateReservation schema
const PlateReservationSchema = new mongoose.Schema({
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    combination: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiration: {
        type: Date,
        required: true
    }
});

PlateReservationSchema.set('versionKey', false);

// Export the PlateReservation model
module.exports = mongoose.model('PlateReservation', PlateReservationSchema);
