const { User } = require("../database/models");

const getAllUser = async () => {
  return await User.findAll({
    attributes: ["fullname", "totalPoint", "userId"],
    order: [
      ["totalPoint", "DESC"],
    ],
    limit: 5,
  });
};

const leaderboardRepo = {
  getAllUser,
};

module.exports = leaderboardRepo;