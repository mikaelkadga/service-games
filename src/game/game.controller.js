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

const gameController = {
  fetchGame
};

module.exports = gameController;