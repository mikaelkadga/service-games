const express = require("express");
const roomRouter = express.Router();
const roomController = require("./room.controller");
const tokenVerification = require("../middleware/token.verification");
const validation = require("../middleware/validate");
const { checkSchema } = require("express-validator");
const roomSchemas = require("../middleware/room.schemas.validation");

/**
 * @swagger
 *  /room/create:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a room
 *      description: This API will create a new room with an empty guestUserId (the opponent's id). You only need to provide a roomCode, the remaining values will be automatically assigned. If success, you will receive the room's code
 *      tags:
 *        - Room
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roomName
 *              properties:
 *                roomName:
 *                  type: string
 *                  example: My Room
 *      responses:
 *        '200':
 *          description: Success created a post
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
 *        '401':
 *          description: Invalid token
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Invalid token
 *        '422':
 *          description: Body validation failed
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: roomName must be a string and not empty
 */
roomRouter.post(
  "/room/create",
  tokenVerification,
  validation(checkSchema(roomSchemas.createRoom)),
  roomController.createRoom,
);

/**
 * @swagger
 *  /room:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a room
 *      description: Returns all rooms that is available, including the rooms that have finished
 *      tags:
 *        - Room
 *      responses:
 *        '200':
 *          description: Returns an array of rooms
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    roomName:
 *                      type: string
 *                      example: My Room
 *                    roomCode:
 *                      type: string
 *                      example: AGJAA
 *                    hostUserId:
 *                      type: integer
 *                      example: 1
 *                    guestUserId:
 *                      type: integer
 *                      example: 2
 *                    hostScore:
 *                      type: integer
 *                      example: 1
 *                    guestScore:
 *                      type: integer
 *                      example: 2
 *                    isFinished:
 *                      type: boolean
 *                      example: false
 *                    createdAt:
 *                      type: date
 *                      example: 2022-09-22T09:37:20.759Z
 *                    updatedAt:
 *                      type: date
 *                      example: 2022-09-22T09:37:20.759Z
 *        '500':
 *          description: Unknown Error
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: Unknown Error
 */
roomRouter.get(
  "/room",
  tokenVerification,
  roomController.getAllRoom,
);

module.exports = roomRouter;