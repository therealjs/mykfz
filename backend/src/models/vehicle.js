"use strict";

const mongoose = require("mongoose");

// Define the Vehicle schema
const VehicleSchema = new mongoose.Schema({
  vin: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  license_plate: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

VehicleSchema.set("versionKey", false);
// VehicleSchema.set("timestamps", true);

// Export the Vehicle model
module.exports = mongoose.model("Vehicle", VehicleSchema);
