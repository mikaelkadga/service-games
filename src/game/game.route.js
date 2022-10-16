const express = require("express");
const gameRouter = express.Router();
const gameController = require("./game.controller");
const tokenVerification = require("../middleware/token.verification");

/**
 * @swagger
 *  /game/{roomId}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get a specific game's data
 *      description: Returns an object of a room with addition the name of host and guest user for a given roomId
 *      tags:
 *        - Game
 *      parameters:
 *        - in: path
 *          name: roomId
 *          schema:
 *            type:
 *              integer
 *            required: true
 *            description: The primary key of the game room
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  roomName:
 *                    type: string
 *                    example: My Room
 *                  roomCode:
 *                    type: string
 *                    example: AGJAA
 *                  hostUserId:
 *                    type: integer
 *                    example: 1
 *                  guestUserId:
 *                    type: integer
 *                    example: 2
 *                  hostScore:
 *                    type: integer
 *                    example: 1
 *                  guestScore:
 *                    type: integer
 *                    example: 2
 *                  isFinished:
 *                    type: boolean
 *                    example: false
 *                  createdAt:
 *                    type: date
 *                    example: 2022-09-22T09:37:20.759Z
 *                  updatedAt:
 *                    type: date
 *                    example: 2022-09-22T09:37:20.759Z
 *                  hostUserName:
 *                    type: string
 *                    example: Player 1
 *                  guestUserName:
 *                    type: string
 *                    example: Player 2
 *        '400':
 *          description: Missing Authorization header
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Missing Authorization header
 *        '401':
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Invalid token
 *        '404':
 *          description: Room not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Room not exist
 */
gameRouter.get(
  "/game/:roomId",
  tokenVerification,
  gameController.fetchGame,
);

/**
 * @swagger
 *  /game/host-win:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Handle when host user win the round
 *      description: Increment both the hostScore and turn value in database
 *      tags:
 *        - Game
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roomId
 *              properties:
 *                roomId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Success
 *        '400':
 *          description: Missing Authorization header
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Missing Authorization header
 *        '401':
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Invalid token
 *        '404':
 *          description: Room not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Room not exist
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Internal server error
 */
gameRouter.put(
  "/game/host-win",
  tokenVerification,
  gameController.hostWinRound,
);

/**
 * @swagger
 *  /game/guest-win:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Handle when guest user win the round
 *      description: Increment both the guestScore and turn value in database
 *      tags:
 *        - Game
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roomId
 *              properties:
 *                roomId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Success
 *        '400':
 *          description: Missing Authorization header
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Missing Authorization header
 *        '401':
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Invalid token
 *        '404':
 *          description: Room not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Room not exist
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Internal server error
 */
gameRouter.put(
  "/game/guest-win",
  tokenVerification,
  gameController.guestWinRound,
);

/**
 * @swagger
 *  /game/finish:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Handle when the game has finished
 *      description: This will set the game to finished and added the winner score to their total point if not draw.
 *      tags:
 *        - Game
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roomId
 *              properties:
 *                roomId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Success
 *        '400':
 *          description: Missing Authorization header
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Missing Authorization header
 *        '401':
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Invalid token
 *        '404':
 *          description: Room not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Room not exist
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Internal server error
 */
gameRouter.put(
  "/game/finish",
  tokenVerification,
  gameController.finishGame,
);

gameRouter.put(
  "/game/update",
  tokenVerification,
  gameController.updateGame,
);

module.exports = gameRouter;