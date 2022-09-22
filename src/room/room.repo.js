const Room = require("../database/models");

const findRoomWithCode = async ({ roomCode }) => {
  return await Room.findOne({ where: { roomCode: roomCode } });
};

const createRoom = async ({ roomName, hostUserId }) => {
  return await Room.create({
    roomName,
    hostUserId,
  });
};

const roomRepo = {
  findRoomWithCode,
  createRoom
};

module.exports = roomRepo;