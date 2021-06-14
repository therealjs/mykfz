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

const read = async (req, res) => {
    try {
        let plateReservation = await PlateReservationModel.findById(
            req.params.plateReservationId
        ).exec();

        if (!plateReservation)
            return res.status(404).json({
                error: 'Not Found',
                message: `PlateReservation not found`
            });

        return res.status(200).json(plateReservation);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let plateReservation = await PlateReservationModel.findByIdAndUpdate(
            req.params.plateReservationId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).exec();

        return res.status(200).json(plateReservation);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await PlateReservationModel.findByIdAndRemove(
            req.params.plateReservationId
        ).exec();

        return res.status(200).json({
            message: `PlateReservation with plateReservationId ${req.params.plateReservationId} was deleted`
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try {
        let filter = req.query; // e.g. { district: '60c20db80271fcbb053ad4aa', owner: '60b9afdadad5b31be63de066' }

        let plateReservations = await PlateReservationModel.find(filter).exec();

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
    read,
    update,
    remove,
    list
};
