const roomService = require("./room.service");

const createRoom = async (req, res) => {
  const userId = req.auth.id;
  const { roomName } = req.body;

  try {
    const newPost = await roomService.createRoom({ roomName, hostUserId: userId });
    return res.json(newPost.roomCode);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const roomController = {
  createRoom,
};

module.exports = roomController;