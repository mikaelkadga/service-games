const gameRepo = require("./game.repo");

const fetchGame = async (roomId) => {
  console.log("called");
  return new Promise(async (resolve, reject) => {
    try {
      const room = await gameRepo.findRoom(roomId);
      if (room) {
        const host = await gameRepo.findUser(room.hostUserId);
        const guest = await gameRepo.findUser(room.guestUserId);

        if (host) {
          room.dataValues.hostUserName = host.fullname;
          console.log(room);
        } else {
          room.dataValues.hostUserName = "";
        }

        if (guest) {
          room.dataValues.guestUserName = guest.fullname;
        } else {
          room.dataValues.guestUserName = "";
        }

        resolve(room);

      } else {
        const error = new Error("Room not exist");
        error.code = 401;
        reject(error);
      }
    } catch (e) {
      const error = new Error("Unknown server error");
      error.code = 500;
      reject(error);
    }
  });
};

const gameService = {
  fetchGame,
};

module.exports = gameService;