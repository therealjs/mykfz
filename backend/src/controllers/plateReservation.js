'use strict';

const PlateReservationModel = require('../models/plateReservation');

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });

    try {
        let plateReservation = await PlateReservationModel.create(req.body);

        return res.status(201).json(plateReservation);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try {
        let plateReservations = await PlateReservationModel.find().exec();

        return res.status(200).json(plateReservations);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
    create,
    list
};
