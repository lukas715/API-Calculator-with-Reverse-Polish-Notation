//Importing User Schema
const User = require("../models/users");

/**
 * Verification Of Tokens Middleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

module.exports = verifyToken = async (req, res, next) => {
  const authKey = req.headers["x-api-key"]; //request the token header

  if (!authKey)
    return res.status(401).json({ Success: false, message: "add a apikey" });
  //check if that token exist

  const existKey = await User.findOne({ apikey: authKey });

  if (existKey != null) {
    req.apikey = authKey;
    next();
  } else {
    return res
      .status(401)
      .json({ Success: false, message: "APIKEY does not exist" });
  }
};
