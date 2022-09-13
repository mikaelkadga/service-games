const { model } = require("../../model");

module.exports = async () => {
  return await model.find();
};
