"use strict";

const mongoose = require("mongoose");

// Define the Vehicle schema
const VehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  vin: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  licensePlate: {
    type: String,
    unique: true,
  },
  state: {
    type: String,
    enum: ["NEW", "REGISTERED", "DEREGISTERED"],
    required: true,
  }, // new / registered / deregistered
  generalInspection: Date,
  processes: [
    {
      processType: {
        type: String,
        enum: ["REGISTRATION", "DEREGISTRATION"],
        required: true,
      },
      date: Date,
      state: String,
      info: Object,
    },
  ],
});

VehicleSchema.set("versionKey", false);
// VehicleSchema.set("timestamps", true);

// Export the Vehicle model
module.exports = mongoose.model("Vehicle", VehicleSchema);
