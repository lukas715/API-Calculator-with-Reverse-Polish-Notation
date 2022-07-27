const mongoose = require("mongoose");

/**
 * Schema/Structure that all users use
 */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    apikey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

/**
 * Exporting Schema
 */

module.exports = mongoose.model("User", UserSchema);
