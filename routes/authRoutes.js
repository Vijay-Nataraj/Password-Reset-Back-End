const express = require("express");
const authController = require("../controllers/authController");

//create a router
const authRouter = express.Router();

//define the routes
authRouter.post("/api/v1/register", authController.register);
authRouter.post("/api/v1/login", authController.login);
authRouter.post("/api/v1/forgot-password", authController.forgotPassword);
authRouter.post("/api/v1/reset-password/:token", authController.resetPassword);

module.exports = authRouter;
