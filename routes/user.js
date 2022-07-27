/**
 * This section holds all the posts and get request related to the calculations.
 * Imports of Schemas and Constructors
 */
const router = require("express").Router();
const Calc = require("../models/operations");
const verifyToken = require("./verifykey");
const ApiError = require("../error-handler/ApiError");

/**
 * All Functions that execute: Addition, Subtraction, Multiplication and Division follow this structure
 * @module /adds
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body.number1 {String}
 * @param req.body.number2 {String}
 * @param req.body {Object} The JSON payload.
 * @param {Function} next
 * @return {Object}
 */
router.post("/adds", verifyToken, async (req, res, next) => {
  if (!req.body.number1 || !req.body.number2) {
    return next(ApiError.badRequest("Missing Fields..."));
  }

  if (isNaN(req.body.number1, req.body.number2)) {
    return next(ApiError.badRequest("integer is required"));
  }

  const finalNumber = new Calc({
    number1: req.body.number1,
    operator: "+",
    number2: req.body.number2,
    apikey: req.apikey,
    total: req.body.number1 + req.body.number2, //Adding the inputs
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});

router.post("/sub", verifyToken, async (req, res, next) => {
  if (!req.body.number1 || !req.body.number2) {
    return next(ApiError.badRequest("field is required"));
  }

  if (isNaN(req.body.number1, req.body.number2)) {
    return next(ApiError.badRequest("integer is required"));
  }

  const finalNumber = new Calc({
    number1: req.body.number1,
    operator: "-",
    number2: req.body.number2,
    apikey: req.apikey,
    total: req.body.number1 - req.body.number2, //Subtracting the inputs
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});

router.post("/div", verifyToken, async (req, res, next) => {
  if (!req.body.number1 || !req.body.number2) {
    return next(ApiError.badRequest("field is required"));
  }

  if (isNaN(req.body.number1, req.body.number2)) {
    return next(ApiError.badRequest("integer is required"));
  }

  const finalNumber = new Calc({
    number1: req.body.number1,
    operator: "/",
    number2: req.body.number2,
    apikey: req.apikey,
    total: req.body.number1 / req.body.number2, //Dividing the inputs
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});
router.post("/mul", verifyToken, async (req, res, next) => {
  if (!req.body.number1 || !req.body.number2) {
    return next(ApiError.badRequest("field is required"));
  }

  if (isNaN(req.body.number1, req.body.number2)) {
    return next(ApiError.badRequest("integer is required"));
  }

  const finalNumber = new Calc({
    number1: req.body.number1,
    operator: "x",
    number2: req.body.number2,
    apikey: req.apikey,
    total: req.body.number1 * req.body.number2, //Multiplying the inputs
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});

/**
 * @module /polish
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Array[]}
 * @param req.body {Object} The JSON payload.
 * @param {Function} next
 * @return {Object}
 */
router.post("/polish", verifyToken, async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(ApiError.badRequest("Missing fields or {} must be removed"));
  }

  const finalNumber = new Calc({
    number1: JSON.stringify(req.body),
    apikey: req.apikey,
    total: polishFunc(req.body),
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});

/**
 * Reverse Polish Notation Function returning the ouput of token inputed
 * @param {string[]} number
 * @return {number}
 */
var polishFunc = function (number) {
  const stack = [];
  const operations = {
    "+": (n1, n2) => n1 + n2,
    "-": (n1, n2) => n1 - n2,
    "*": (n1, n2) => n1 * n2,
    "/": (n1, n2) => Math.trunc(n1 / n2),
  };

  for (const element of number) {
    if (operations[element]) {
      var n2 = stack.pop();
      var n1 = stack.pop();

      stack.push(operations[element](n1, n2));
    } else {
      stack.push(parseInt(element));
    }
  }
  return stack.pop();
};

/**
 * @module /sort
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Array[]}
 * @param req.body {Object} The JSON payload.
 * @param {Function} next
 * @return {Object}
 */
router.post("/sort", verifyToken, async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(ApiError.badRequest("Missing fields or {} must be removed"));
  }

  const finalNumber = new Calc({
    number1: JSON.stringify(req.body),
    apikey: req.apikey,
    total: JSON.stringify(
      req.body.sort(function (a, b) {
        //Sorting Function to sort list from lowest to highest
        return a - b;
      })
    ),
  });

  const savedCalc = await finalNumber.save();

  res.status(200).json(savedCalc);
});

/**
 * @module /filter
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Array[]}
 * @param req.body {Object} The JSON payload.
 * @param {Function} next
 * @return {Object}
 */
router.post("/filter", verifyToken, async (req, res, next) => {
  console.log(req.body);
  if (!req.body || Object.keys(req.body).length == 0) {
    return next(ApiError.badRequest("Missing fields or {} must be removed"));
  }

  const finalNumber = new Calc({
    number1: JSON.stringify(req.body),
    apikey: req.apikey,
    total: JSON.stringify(isEven(req.body)), //Calling the function below
  });

  //Function to check if the numbers are even and then returning even numbers
  function isEven(x) {
    const arrayNumber = [];

    for (var i = 0; i < req.body.length; i++) {
      if (req.body[i] % 2 === 0) {
        arrayNumber.push(req.body[i]);
      }
    }
    return arrayNumber;
  }

  const savedCalc = await finalNumber.save();
  console.log(savedCalc);

  res.status(200).json(savedCalc);
});

module.exports = router;
