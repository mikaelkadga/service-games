const roomService = require("./room.service");

const createRoom = async (req, res) => {
  const userId = req.auth.id;
  const { roomName } = req.body;
  //console.log(req.auth);
  try {
    const newPost = await roomService.createRoom(
      { roomName, hostUserId: userId },
    );
    return res.json(newPost.roomCode);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const getAllRoom = async (req, res) => {
  try {
    const rooms = await roomService.getAllRoom();
    return res.json(rooms);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const getRoomId = async (req, res) => {
  const { roomCode } = req.params;
  try {
    const roomId = await roomService.getRoomId({roomCode});
    return res.json({ roomId: roomId });
  } catch (e) {
    console.log(e);
    res.status(e.code).send(e.message);
  }
};

const findRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const post = await roomService.findRoom(roomId);
    return res.json(post);
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const roomController = {
  createRoom,
  getAllRoom,
  findRoom,
  getRoomId,
};

module.exports = roomController;