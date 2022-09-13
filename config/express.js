"use strict";

const express = require("express");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const { NotFound, ConvertError, ErrorHandler } = require("../middleware/error");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const { env } = require("./env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// compress request
app.use(compress());

// secure apps
app.use(helmet());

// enable cors
app.use(cors());

// swagger
env !== "production" &&
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/v1", require("../routes"));

// 404 handler
app.use(NotFound);

// convert error to be readable
app.use(ConvertError);

// error hanlder, send stacktrace only during development
app.use(ErrorHandler);

module.exports = app;
