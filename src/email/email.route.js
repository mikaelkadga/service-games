const express = require("express");
const emailRouter = express.Router();
const emailController = require("./email.controller");

emailRouter.post(
  "/email", 
  emailController.send,
);

module.exports = emailRouter;