const { User } = require("../database/models");

const getAllUser = async () => {
    return await User.findAll({
        attributes: ['fullname', 'totalPoint', 'userId']
    })
}

const leaderboardRepo = {
    getAllUser
}

module.exports = leaderboardRepo;