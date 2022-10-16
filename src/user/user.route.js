const express = require("express");
const tokenVerification = require("../middleware/token.verification");
const validation = require("../middleware/validate");
const { checkSchema } = require("express-validator");

const userController = require("./user.controller");
const userRouter = express.Router();
const schemas = require("../middleware/schemas.validation");

/**
 * @swagger
 * /user/register:
 *  post:
 *    tags:
 *      - User
 *    summary: API Register User
 *    description: API untuk user melakukan registrasi pada server
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullname:
 *                type: string
 *                example: Rijal Rubi
 *              email:
 *                type: string
 *                example: rijalrubio@gmail.com
 *              password:
 *                type: string
 *                example: PasswordValid12!
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                fullname:
 *                  type: string
 *                  example: Rijal Rubi
 *                email:
 *                  type: string
 *                  example: rijal@gmail.com
 *                password:
 *                  type: string
 *                  example: $2b$10$23x8HGb7kubpf.VKagiQu.I.qL15T9MIku6/RCNwdFA4A4Hwj69au
 *                createdAt:
 *                  type: string
 *                  example: 2022-08-17T16:34:05.086Z
 *                updatedAt:
 *                  type: string
 *                  example: 2022-08-17T16:34:05.086Z
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

userRouter.post(
  "/user/register",
  validation(checkSchema(schemas.registrationSchema)),
  userController.createUser
);

userRouter.get(
  "/user/",
  tokenVerification,
  userController.getUserProfile
);

userRouter.put(
  "/user/",
  tokenVerification,
  validation(checkSchema(schemas.updateUser)),
  userController.updateUser
)

userRouter.post(
  "/user/resetpassword",
  tokenVerification,
  validation(checkSchema(schemas.resetPassword)),
  userController.resetPassword
)

module.exports = userRouter;
