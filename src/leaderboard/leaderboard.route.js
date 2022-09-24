const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const leaderboardController = require("./leaderboard.controller");
const leaderboardRouter = express.Router();

leaderboardRouter.get("/leaderboard", tokenVerification, leaderboardController.getAllUser)

/**
 * @swagger
 * /leaderboard:
 *  get:
 *    tags:
 *      - Leaderboard
 *    summary: user total point
 *    description: API untuk mengambil total point user
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                fullname:
 *                  type: string
 *                  example: Rijal Rubi
                  totalPoint:
                    type: integer
                    example: 123123
                  userId: 
                    type: integer
                    exmample: 1
 *      '500':
 *        content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Internal Server Error
 */

module.exports = leaderboardRouter