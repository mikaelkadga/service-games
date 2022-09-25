const { Room } = require("../database/models");
const { User } = require("../database/models");

const findUser = async (userId) => {
  return await User.findByPk(userId);
};

const findRoom = async (roomId) => {
  return await Room.findByPk(roomId);
};

const updateGame = async (updatedValue, roomId) => {
  const room = await Room.update(updatedValue, {
    where: {
      id: roomId,
    },
  });
  return room;
};

const updateUserPoint = async ({ userId, addedPoint }) => {
  const user = await User.update({
    totalPoint: addedPoint,
  }, {
    where: {
      id: userId,
    },
  });
  return user;
};

const gameRepo = {
  findUser,
  findRoom,
  updateGame,
  updateUserPoint,
};

module.exports = gameRepo;