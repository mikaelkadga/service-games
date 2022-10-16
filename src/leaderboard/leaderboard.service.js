const leaderboardRepo = require("./leaderboard.repository");

const getAllUser = async () => {
    return await leaderboardRepo.getAllUser()
}

const leaderboardService = {
    getAllUser
}

module.exports = leaderboardService;