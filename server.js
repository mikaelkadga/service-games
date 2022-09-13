"use strict";

const http = require("http");
const { port } = require("./config/env");
const app = require("./config/express");

const server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
  //Connect();
  console.log("Server is up and listening on port : " + port);
});

module.exports = server;
