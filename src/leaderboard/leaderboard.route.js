const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const leaderboardController = require("./leaderboard.controller");
const leaderboardRouter = express.Router();

leaderboardRouter.get("/leaderboard", tokenVerification, leaderboardController.getAllUser);

/**
 * @swagger
 *  /leaderboard:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a room
 *      description: this api is used to get user total point 
 *      tags:
 *        - Leaderboard
 *      responses:
 *        '200':
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: JSKDN
 *        '400':
 *          description: Missing Authorization header
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Missing Authorization header
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Internal Server Error
 */

module.exports = leaderboardRouter
