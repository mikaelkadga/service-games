"use strict";

const { listService } = require("../service");

module.exports = async (req, res, next) => {
  const list = await listService();
  res.status(200).json(list);
};
