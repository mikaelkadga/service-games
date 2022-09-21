const Room = require("../database/models");

const findRoomWithCode = async ({ roomCode }) => {
  return await Room.findOne({ where: { roomCode: roomCode } });
};

const roomRepo = {
  findRoomWithCode,
};

module.exports = roomRepo;