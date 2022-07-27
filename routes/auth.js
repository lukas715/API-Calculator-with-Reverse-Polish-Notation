/**
 * All Imports of Schemas, Constructors and Routes along with NPM installations
 */
const router = require("express").Router();
const User = require("../models/users");
const Operations = require("../models/operations");
const ApiError = require("../error-handler/ApiError");
const verifyToken = require("./verifykey");
const { v4: uuidv4 } = require("uuid");

/**
 * Register Function that returns a unique API Key
 * @module /registers
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body.username {String}
 * @param req.body {Object} The JSON payload.
 * @param {Function} next
 * @return {Object}
 */
router.post("/registers", async (req, res, next) => {
  if (!req.body) {
    return next(ApiError.badRequest("field is required"));
  }
  //Get user input
  const { username } = req.body;

  //check if all fields are filled
  if (!username) {
    return next(ApiError.badRequest("Please fill in all fields"));
  }

  //check if username already exists
  const existUsername = await User.findOne({ username: username });

  if (existUsername) {
    return next(ApiError.badRequest("Username already exists"));
  }

  const newUser = new User({
    username: username,
    apikey: uuidv4(), //Generate universally unique identifier (UUID)/API Key
  });

  const savedUser = await newUser.save(); //save to Database

  res.status(200).json({
    username: savedUser.username,
    createdAt: savedUser.createdAt,
    apikey: savedUser.apikey,
  });
});

/**
 * Get Request showing user's calculation history
 * @module /logs
 * @function
 * @header {string} .
 * @return {Object}
 */
router.get("/logs", verifyToken, async (req, res) => {
  try {
    const history = await Operations.find({ apikey: req.apikey });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Exporting Route
module.exports = router;
