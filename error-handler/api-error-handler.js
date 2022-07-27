//Importing Constructor
const ApiError = require("./ApiError");

//Error Handler that checks for errors
function apiErrorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json("Something went wrong");
}

//Exporting Handler
module.exports = apiErrorHandler;
