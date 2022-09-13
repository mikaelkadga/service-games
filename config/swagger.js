"use strict";

const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  explorer: true,
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Alpha Node Boilerplate",
      description: "eL Node Boilerplate Information",
      contact: {
        name: "Alpha Node Boilerplate",
      },
      servers: ["http://localhost:5000"],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["app.js", "routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
