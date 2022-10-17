const { User } = require('../database/models');
const { Op } = require('sequelize');

const getAllUser = async () => {
  return await User.findAll({
    where: {
      totalPoint: {
        [Op.not]: null,
        [Op.gt]: 0,
      },
    },
    attributes: ['fullname', 'totalPoint', 'userId'],
    order: [['totalPoint', 'DESC']],
    limit: 10,
  });
};

const leaderboardRepo = {
  getAllUser,
};

module.exports = leaderboardRepo;
