"use strict";

const { ValidationError } = require("express-validation");
const { env } = require("../config/env");
const APIError = require("../utils/APIError");
const { NOT_FOUND } = require("../utils/constants");

/**
 * Error handles
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */

const Handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };
  if (env === "production") delete response.stack;
  res.status(response.code).json(response);
  res.end();
};

exports.ErrorHandler = Handler;
exports.Handler = Handler;

/**
 * 404 handler
 */

exports.NotFound = (req, res, next) => {
  const err = new APIError({
    message: `[${req.method}] ${req.url} - Resource not found`,
    status: NOT_FOUND,
  });
  return Handler(err, req, res, next);
};

/**
 * Convert Error Thrown By Express Validator OR Not an Instance of API Error
 */
exports.ConvertError = (err, req, res, next) => {
    let ConvertedError = err;
    let errors = [];
    let error;
    if (err instanceof ValidationError) {
      if (err.details.query) {
        error = err.details.query.map((e) => ({
          location: e.location,
          messages: e.message.replace(/[^\w\s]/gi, ""),
          path: e.path[0],
        }));
        errors = [...errors, ...error];
      }
  
      if (err.details.body) {
        error = err.details.body.map((e) => ({
          location: e.location,
          messages: e.message.replace(/[^\w\s]/gi, ""),
          path: e.path[0],
        }));
        errors = [...errors, ...error];
      }
  
      if (err.details.params) {
        error = err.details.params.map((e) => ({
          location: e.location,
          messages: e.message.replace(/[^\w\s]/gi, ""),
          path: e.path[0],
        }));
        errors = [...errors, ...error];
      }
      ConvertedError = new APIError({
        message: "Validation Error",
        status: err.status || 400,
        errors,
      });
    } else if (!(err instanceof APIError)) {
      ConvertedError = new APIError({
        message: err.message,
        status: err.status,
        stack: err.stack,
      });
    }
    return Handler(ConvertedError, req, res, next);
  };