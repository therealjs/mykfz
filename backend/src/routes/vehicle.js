"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const VehicleController = require("../controllers/vehicle");

router.get("/", VehicleController.list); // List all vehicles
router.post("/", middlewares.checkAuthentication, VehicleController.create); // Create a new vehicle
router.get("/:id", VehicleController.read); // Read a vehicle by Id
router.put("/:id", middlewares.checkAuthentication, VehicleController.update); // Update a vehicle by Id
router.delete(
  "/:id",
  middlewares.checkAuthentication,
  VehicleController.remove
); // Delete a vehicle by Id

module.exports = router;
