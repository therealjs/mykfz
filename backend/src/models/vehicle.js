'use strict';

const mongoose = require('mongoose');

// Define the Vehicle schema
const VehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vin: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    make: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    licensePlate: {
        type: String,
        // validate: /^[A-Z]{1,3}-[A-Z]{1,2} [0-9]{1,4}$/,
        required: false
    },
    state: {
        type: String,
        enum: ['NEW', 'REGISTERED', 'DEREGISTERED'],
        required: true
    }, // new / registered / deregistered
    generalInspectionMonth: String,
    generalInspectionYear: String,
    processes: [
        {
            processType: {
                type: String,
                enum: ['REGISTRATION', 'DEREGISTRATION'],
                required: true
            },
            date: Date,
            state: String,
            info: Object
        }
    ]
});

VehicleSchema.set('versionKey', false);
// VehicleSchema.set("timestamps", true);

// Export the Vehicle model
module.exports = mongoose.model('Vehicle', VehicleSchema);
