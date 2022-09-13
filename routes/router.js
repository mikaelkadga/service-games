"use strict";

const { listController } = require("../api/controller");

const router = require("express").Router();

router.get("/", listController);

module.exports = router;
