const { Room } = require("../database/models");
const { User } = require("../database/models");

const findUser = async (userId) => {
  return await User.findByPk(userId);
};

const findRoom = async (roomId) => {
  return await Room.findByPk(roomId);
};

const gameRepo = {
  findUser,
  findRoom,
};

module.exports = gameRepo;