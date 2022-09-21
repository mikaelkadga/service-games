const express = require("express");
const roomRouter = express.Router();
const roomController = require("./room.controller");
const tokenVerification = require("../middleware/token.verification");
const validation = require("../middleware/validate");
const { checkSchema } = require("express-validator");
const roomSchemas = require("../middleware/room.schemas.validation");

/**
 * @swagger
 *  /post/create:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create a room
 *      description: This API will create a new room with an empty guestUserId (the opponent' id). You only need to provide a roomCode, the remaining values will be automatically assigned. If success, you will receive the room's code
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
  "/create",
  tokenVerification,
  validation(checkSchema(roomSchemas.createRoom)),
  roomController.createRoom,
);

module.exports = roomRouter;