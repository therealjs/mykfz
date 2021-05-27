"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const middlewares = require("./middlewares");

const auth = require("./routes/auth");
const vehicle = require("./routes/vehicle");

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get("/", (req, res) => {
  res.json({
    name: "MyKfz Backend",
  });
});

// API routes
api.use("/auth", auth);
api.use("/vehicles", vehicle);

module.exports = api;
