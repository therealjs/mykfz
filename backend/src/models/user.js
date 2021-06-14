'use strict';
const AddressSchema = require('./address');
const IdentityDocumentSchema = require('./identityDocument');

const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
    },
    identityDocument: {
        type: IdentityDocumentSchema,
        required: true
    },
    licensePlateReservations: [
        {
            licensePlate: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'LicensePlate',
                required: true
            },
            expiryDate: Date
        }
    ]
});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
