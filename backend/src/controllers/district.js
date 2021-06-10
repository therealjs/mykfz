'use strict';

const DistrictModel = require('../models/district');

const read = async (req, res) => {
    try {
        let district = await DistrictModel.findById(
            req.params.districtId
        ).exec();

        if (!district)
            return res.status(404).json({
                error: 'Not Found',
                message: `District not found`
            });

        return res.status(200).json(district);
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
        let district = await DistrictModel.findByIdAndUpdate(
            req.params.districtId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).exec();

        return res.status(200).json(district);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list = async (req, res) => {
    try {
        let districts = await DistrictModel.find().exec();

        return res.status(200).json(districts);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
    read,
    update,
    list
};
