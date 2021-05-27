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
    let filter = {};

    let owner = req.query.owner; // query parameter called owner, e.g., .../vehicles?owner=1234

    if (owner && owner.match(/^[0-9a-fA-F]{24}$/)) {
      // owner is defined and a valid ObjectId
      console.log(`querying for vehicles of owner ${owner}`);
      filter = { owner: owner };
    } else {
      console.log("querying for all vehicles");
      // TODO throw 400 if owner is invalid
    }

    let vehicles = await VehicleModel.find(filter).exec();

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
