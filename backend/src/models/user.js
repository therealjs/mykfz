'use strict';

const mongoose = require('mongoose');

let examplePlate = {
    _id: '60c5b66cb32d3d3a1d3ed340',
    areaCode: 'M',
    letters: 'AF',
    digits: 1969,
    reservation: {
        owner: '60c5b66cb32d3d3a1d3ed33f', // either vehicle or user who reserved plate
        expiryDate: 'infinity'
    }
};

let exampleUser = {
    _id: '60c5b66cb32d3d3a1d3ed33f',
    username: 'test',
    password: '$2a$08$qlAO7b3HBwz0W6Bn94a5j.f.RA8KiTvXDiLJ7BsL94rqydK2cq0e.',
    // ...
    reservedPlates: [
        {
            _id: '60c5b66cb32d3d3a1d3ed340',
            expiryDate: '2021 - 05 - 01',
            licensePlate: {
                _id: '60c5b66cb32d3d3a1d3ed340',
                areaCode: 'M',
                letters: 'AF',
                digits: 1969
            }
        }
    ]
};

let exampleVehicle = {
    _id: '60c5b92e4b95dc3f2de6207a',
    vin: 'WVWHN7AN5AE530234',
    owner: '60c5b66cb32d3d3a1d3ed33f',
    state: 'REGISTERED',
    licensePlate: {
        _id: '60c5b66cb32d3d3a1d3ed340',
        areaCode: 'M',
        letters: 'AF',
        digits: 1969
    },
    make: 'VOLKSWAGEN',
    model: 'Passat',
    generalInspectionYear: '2022',
    generalInspectionMonth: '2',
    processes: []
};

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

const IdentityDocumentSchema = mongoose.Schema({
    nfcId: String,
    idId: {
        type: String,
        required: true
    }, // e.g., LF3033PHJ
    expirationDate: Date // todo should be required
});

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
    }
});

UserSchema.set('versionKey', false);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
