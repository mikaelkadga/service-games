const { Room } = require("../database/models");

const findRoomWithCode = async ({ roomCode }) => {
  return await Room.findOne({
    where: { roomCode: roomCode },
  });
};

const createRoom = async ({ roomName, hostUserId }) => {
  const roomCode = await generateRoomCode();
  return await Room.create({
    roomName,
    hostUserId,
    roomCode,
  });
};

const updateRoom = async (
  id,
  guestUserId,
  hostScore,
  guestScore,
  hostSelection,
  guestSelection,
  turn,
  isFinished
) => {
  return await Room.update(
    {
      guestUserId,
      hostScore,
      guestScore,
      hostSelection,
      guestSelection,
      turn,
      isFinished,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
};

const updateGuestUser = async ({ id, guestUserId }) => {
  return await Room.update(
    {
      guestUserId,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
};

const getAllRoom = async () => {
  return await Room.findAll();
};

const findRoom = async (roomId) => {
  return await Room.findByPk(roomId);
};

const roomRepo = {
  findRoomWithCode,
  createRoom,
  getAllRoom,
  findRoom,
  updateRoom,
  updateGuestUser,
};

module.exports = roomRepo;

// UTILS

const generateRoomCode = async () => {
  let roomCode;
  let room;

  do {
    roomCode = createRandomString();
    room = await roomRepo.findRoomWithCode({ roomCode });
  } while (room);

  return roomCode;
};


/**
 * Creates a random string with the length of 5
 * @return {string}
 */
function createRandomString() {
  const length = 5;

  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}