"use strict";

const VehicleModel = require("../models/vehicle");

const create = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });

  try {
    let vehicle = await VehicleModel.create(req.body);

    return res.status(201).json(vehicle);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let vehicle = await VehicleModel.findById(req.params.id).exec();

    if (!vehicle)
      return res.status(404).json({
        error: "Not Found",
        message: `Vehicle not found`,
      });

    return res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  try {
    let vehicle = await VehicleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    return res.status(200).json(vehicle);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await VehicleModel.findByIdAndRemove(req.params.id).exec();

    return res
      .status(200)
      .json({ message: `Vehicle with id${req.params.id} was deleted` });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    let vehicles = await VehicleModel.find({}).exec();

    return res.status(200).json(vehicles);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  list,
};
