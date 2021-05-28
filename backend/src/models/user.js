"use strict";

const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  zipCode: String,
  city: String,
  street: String,
  houseNumber: String,
});

const IdentityDocumentSchema = mongoose.Schema({
  nfcId: String,
  idId: {
    type: String,
    required: true,
  }, // e.g., LF3033PHJ
  expirationDate: Date, // todo should be required
});

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  identityDocument: {
    type: IdentityDocumentSchema,
    required: true,
  },
});

UserSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
