const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const leaderboardController = require("./leaderboard.controller");
const leaderboardRouter = express.Router();

leaderboardRouter.get("/leaderboard", tokenVerification, leaderboardController.getAllUser)

module.exports = leaderboardRouter