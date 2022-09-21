const leaderboardService = require("./leaderboard.service");

const getAllUser = async (req,res) => {
    try {
        const getUsers = await leaderboardService.getAllUser();
        return res.status(200).json(getUsers);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error!" });
      }
}

const leaderboardController = {
    getAllUser
}

module.exports = leaderboardController