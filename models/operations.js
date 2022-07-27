const mongoose = require("mongoose");

/**
 * Schema/Structure that all operations use
 */

const operationSchema = new mongoose.Schema(
  {
    number1: { type: Number, type: String, required: true },
    operator: { type: String, enum: ["+", "-", "/", "x"] },
    number2: { type: Number },
    apikey: { type: String, required: true },
    total: { type: Number, type: String, required: true },
  },
  { timestamps: true }
);

/**
 * Exporting Schema
 */

module.exports = mongoose.model("operations", operationSchema);
