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
 *      summary: Get all rooms
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

/**
 * @swagger
 *  /room/{roomId}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get a specific room
 *      description: Returns an object of a room for a given roomId
 *      tags:
 *        - Room
 *      parameters:
 *        - in: path
 *          name: roomId
 *          schema:
 *            type:
 *              integer
 *            required: true
 *            description: The primary key of the room
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
roomRouter.get(
  "/room/:roomId",
  tokenVerification,
  roomController.findRoom);

/**
 * @swagger
 *  /room/join/{roomCode}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Join a room
 *      description: Returns the roomId for the given roomCode
 *      tags:
 *        - Room
 *      parameters:
 *        - in: path
 *          name: roomCode
 *          schema:
 *            type:
 *              string
 *            required: true
 *            description: The primary key of the room
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  roomId:
 *                    type: integer
 *                    example: 1
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
roomRouter.get(
  "/room/join/:roomCode",
  tokenVerification,
  roomController.getRoomId);

  
/**
 * @swagger
 *  /room/{roomId}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Send selected value
 *      description: Send selected value (rock/paper/scissor) for a given roomId
 *      tags:
 *        - Room
 *      parameters:
 *        - in: path
 *          name: roomId
 *          schema:
 *            type:
 *              integer
 *            required: true
 *            description: The primary key of the room
 *      requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              selection:
 *                type: integer
 *                example: 1
 *              turn:
 *                type: integer
 *                example: 1
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
 *                  hostSelection:
 *                    type: integer
 *                    example: 1
 *                  guestSelection:
 *                    type: integer
 *                    example: 0
 *                  isFinished:
 *                    type: boolean
 *                    example: false
 *                  createdAt:
 *                    type: date
 *                    example: 2022-09-22T09:37:20.759Z
 *                  updatedAt:
 *                    type: date
 *                    example: 2022-09-22T09:37:20.759Z
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
roomRouter.put(
  "/room/:roomId",
  tokenVerification,
  validation(checkSchema(roomSchemas.updateRoom)),
  roomController.updateRoom);

module.exports = roomRouter;