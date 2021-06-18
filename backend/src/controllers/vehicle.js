'use strict';

const VehicleModel = require('../models/vehicle');

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });

    try {
        let vehicle = await VehicleModel.create(req.body);

        return res.status(201).json(vehicle);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let vehicle = await VehicleModel.findById(req.params.vehicleId).exec();

        if (!vehicle)
            return res.status(404).json({
                error: 'Not Found',
                message: `Vehicle not found`
            });

        return res.status(200).json(vehicle);
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
        let vehicle = await VehicleModel.findByIdAndUpdate(
            req.params.vehicleId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).exec();

        return res.status(200).json(vehicle);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await VehicleModel.findByIdAndRemove(req.params.vehicleId).exec();

        return res.status(200).json({
            message: `Vehicle with vehicleId ${req.params.vehicleId} was deleted`
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
        let filter = req.query;

        let vehicles = await VehicleModel.find(filter).exec();

        return res.status(200).json(vehicles);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const createProcess = (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });

    try {
        let { vehicleId } = req.params;
        let processToAdd = req.body;

        // for some reason this is executed twice; addToSet avoids duplicates
        VehicleModel.findByIdAndUpdate(
            vehicleId,
            {
                $addToSet: { processes: processToAdd }
            },
            { safe: true, upsert: true, new: true },
            function (err, model) {
                if (err) {
                    console.err(err);
                    return res.status(500).json({
                        error: 'Internal server error',
                        message: err.message
                    });
                } else {
                    console.log('added process successfully');
                    return res.status(201).json(model);
                }
            }
        );
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const readProcess = async (req, res) => {
    try {
        let { vehicleId, processId } = req.params;

        let vehicle = await VehicleModel.findById(vehicleId).exec();

        if (!vehicle) {
            return res.status(404).json({
                error: 'Not Found',
                message: `Vehicle not found`
            });
        }

        let process = vehicle.processes.find((p) => p._id == processId);

        if (!process) {
            return res.status(404).json({
                error: 'Not Found',
                message: `Process not found`
            });
        }

        return res.status(200).json(process);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const listProcesses = async (req, res) => {
    try {
        let vehicle = await VehicleModel.findById(req.params.vehicleId).exec();

        if (!vehicle)
            return res.status(404).json({
                error: 'Not Found',
                message: `Vehicle not found`
            });

        return res.status(200).json(vehicle.processes);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

module.exports = {
    create,
    read,
    update,
    remove,
    list,
    createProcess,
    readProcess,
    listProcesses
};
