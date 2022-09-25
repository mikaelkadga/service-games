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

const hostWinRound = async ({ roomId }) => {
  console.log(roomId);
  return new Promise(async (resolve, reject) => {
    try {
      const prevRoom = await gameRepo.findRoom(roomId);

      if (prevRoom) {
        const newScore = prevRoom.hostScore += 1;
        const newTurn = prevRoom.turn += 1;
        const editedRoom = await gameRepo.updateGame({
          hostScore: newScore,
          turn: newTurn,
        }, roomId);
        resolve(editedRoom);
      } else {
        const error = new Error("Can't find the room");
        error.code = 404;
        reject(error);
      }
    } catch (e) {
      const error = new Error("Failed while updating a game room");
      error.code = 500;
      reject(error);
    }
  });
};

const guestWinRound = async ({ roomId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prevRoom = await gameRepo.findRoom(roomId);

      if (prevRoom) {
        const newScore = prevRoom.guestScore += 1;
        const newTurn = prevRoom.turn += 1;
        const editedRoom = await gameRepo.updateGame({
          guestScore: newScore,
          turn: newTurn,
        }, roomId);
        resolve(editedRoom);
      } else {
        const error = new Error("Can't find the room");
        error.code = 404;
        reject(error);
      }
    } catch (e) {
      const error = new Error("Failed while updating a game room");
      error.code = 500;
      reject(error);
    }
  });
};

const gameService = {
  fetchGame,
  hostWinRound,
  guestWinRound,
};

module.exports = gameService;