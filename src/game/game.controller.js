const gameService = require("./game.service");

const fetchGame = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await gameService.fetchGame(roomId);
    return res.json(room);
  } catch (e) {
    console.log(e);
    res.status(e.code).send(e.message);
  }
};

const hostWinRound = async (req, res) => {
  const { roomId } = req.body;

  try {
    await gameService.hostWinRound({ roomId });
    return res.send("success");
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const guestWinRound = async (req, res) => {
  const { roomId } = req.body;

  try {
    await gameService.guestWinRound({ roomId });
    return res.send("success");
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const finishGame = async (req, res) => {
  const { roomId } = req.body;

  try {
    await gameService.finishGame({ roomId });
    return res.send("success");
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const updateGame = async (req, res) => {
  const { roomId, updatedValues } = req.body;
  console.log(updatedValues);

  try {
    const newRoom = await gameService.updateGame({
      roomId,
      updatedValues,
    });
    return res.send(newRoom);
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const gameController = {
  fetchGame,
  hostWinRound,
  guestWinRound,
  finishGame,
  updateGame,
};

module.exports = gameController;