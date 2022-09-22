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

const roomService = {
  createRoom,
};

module.exports = roomService;