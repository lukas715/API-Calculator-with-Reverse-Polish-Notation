/**
 * All Imports and Routes
 */
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const apiErrorHandler = require("./error-handler/api-error-handler");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

/**
 * Letting Express use JSON and routes
 */
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(apiErrorHandler);

/**
 * Port 5000
 */
const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log(`backend is running on port: ${port}`);
});
