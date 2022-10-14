const roomRepo = require("./room.repo");

const createRoom = async ({ roomName, hostUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newRoom = await roomRepo.createRoom({
        roomName, hostUserId,
      });
      resolve(newRoom);
    } catch (e) {
      const error = new Error("Failed while create a new room");
      console.log(e);
      error.code = 401;
      reject(error);
    }
  });
};

const getAllRoom = async () => {
  return new Promise(async (resolve, reject) => {
    const room = await roomRepo.getAllRoom();
    if (room) {
      resolve(room);
    } else {
      const error = new Error("Unknown Error");
      error.code = 500;
      reject(error);
    }
  });
};

const findRoom = async (roomId) => {
  return new Promise(async (resolve, reject) => {
    const room = await roomRepo.findRoom(roomId);
    if (room) {
      resolve(room);
    } else {
      const error = new Error("Room not exist");
      error.code = 404;
      reject(error);
    }
  });
};

const getRoomId = async ({ roomCode }) => {
  return new Promise(async (resolve, reject) => {
    const room = await roomRepo.findRoomWithCode({ roomCode });
    if (room) {
      resolve(room);
    } else {
      const error = new Error("Room not exist");
      error.code = 404;
      reject(error);
    }
  });
};

const updateRoom = async (
  roomId,
  guestUserId,
  hostScore,
  guestScore,
  hostSelection,
  guestSelection,
  turn,
  isFinished
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await roomRepo.updateRoom(
        roomId,
        guestUserId,
        hostScore,
        guestScore,
        hostSelection,
        guestSelection,
        turn,
        isFinished
      );
      if (room) {
        resolve(room);
      } else {
        const error = new Error("Room not exist");
        error.code = 404;
        reject(error);
      }
    } catch (e) {
      const error = new Error("Failed while update the room");
      console.log(e);
      error.code = 401;
      reject(error);
    }
  });
};

const updateGuestUser = async ({ id, guestUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await roomRepo.updateGuestUser({ id, guestUserId });
      if (room) {
        resolve(room);
      } else {
        const error = new Error("Room not exist");
        error.code = 404;
        reject(error);
      }
    } catch (e) {
      const error = new Error("Failed while update the room");
      console.log(e);
      error.code = 401;
      reject(error);
    }
  });
};

const roomService = {
  createRoom,
  getAllRoom,
  findRoom,
  getRoomId,
  updateRoom,
  updateGuestUser,
};

module.exports = roomService;