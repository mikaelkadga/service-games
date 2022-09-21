const roomRepo = require("./room.repo");

const generateRoomCode = async () => {
  let roomCode;
  let room;

  do {
    roomCode = createRandomString();
    room = await roomRepo.findRoomWithCode({ roomCode });
  } while (roomCode == room.roomCode);

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

const roomUtils = {
  generateRoomCode,
};

module.exports = roomUtils;
