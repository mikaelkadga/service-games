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

const roomService = {
  createRoom,
  getAllRoom,
};

module.exports = roomService;