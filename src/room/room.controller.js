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
  const userId = req.auth.id;

  try {
    const room = await roomService.getRoomId({ roomCode });
    if (userId != room.hostUserId && room.guestUserId == null) {
      await roomService.updateGuestUser({
        id: room.id,
        guestUserId: userId,
      });
    }
    return res.json({ room: room });
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

const updateRoom = async (req, res) => {
  const userId = req.auth.id;
  const { roomId } = req.params;
  const { selection, turn } = req.body;
  try {
    const room = await roomService.findRoom(roomId);

    if (room.hostUserId == userId) {
      room.hostSelection = selection;
    } else {
      if (room.guestUserId == null) room.guestUserId = userId;
      room.guestSelection = selection;
    }

    if (room.hostSelection != 0 && room.guestSelection != 0) {
      //1 : rock, 2: paper, 3: scissor
      if (room.hostSelection == room.guestSelection) {
        // Draw
        room.hostSelection = 0;
        room.guestSelection = 0;
      } else if (
        (room.hostSelection == 1 && room.guestSelection == 3) ||
        (room.hostSelection == 2 && room.guestSelection == 1) ||
        (room.hostSelection == 3 && room.guestSelection == 2)
      ) {
        // Host win
        room.hostScore = room.hostScore + 1;
      } else if (
        (room.hostSelection == 1 && room.guestSelection == 2) ||
        (room.hostSelection == 2 && room.guestSelection == 3) ||
        (room.hostSelection == 3 && room.guestSelection == 1)
      ) {
        // Guest win
        room.guestScore = room.guestScore + 1;
      }
      room.isFinished = true;
    }

    const post = await roomService.updateRoom(
      roomId,
      room.guestUserId,
      room.hostScore,
      room.guestScore,
      room.hostSelection,
      room.guestSelection,
      turn,
      room.isFinished
    );
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
  updateRoom,
};

module.exports = roomController;