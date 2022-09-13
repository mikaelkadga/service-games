"use strict";

const { INTERNAL_SERVER_ERROR } = require("../constants");

class APIError extends Error {
  constructor({
    message,
    stack,
    errors = [],
    status = INTERNAL_SERVER_ERROR,
    isPublic,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}

module.exports = APIError;
