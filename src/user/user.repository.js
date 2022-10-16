const { json } = require("body-parser");
const { User } = require("../database/models");

const createUser = async ({ fullname, email, password }) => {
  const isUserExists = await User.findOne({ where: { email }, raw: true });
  if (!isUserExists) {
    return await User.create({
      fullname,
      email,
      password,
    });
  } else {
    return json({ message: error.message });
  }
};

const getUser = async ({ userId }) => {
  return await User.findOne({ where: { userId }, raw: true });
};

const getUserEmail = async ({ email }) => {
  return await User.findOne({ where: { email }, raw: true });
};

const getUserProfile = async ({ userId }) => {
  return await User.findOne({ where: { userId }, raw: true });
};

const updateUser = async ({ userId, fullname, email, password }) => {
  return await User.update(
    {
      fullname,
      email,
      password,
    },
    {
      where: {
        userId: userId,
      },
      returning: true,
    }
  );
};

const updatePassword = async ({ userId, password }) => {
  return await User.update(
    {
      password
    },
    {
      where: {
        userId: userId,
      },
      returning: true,
    }
  );
};

const userRepository = {
  createUser,
  getUser,
  getUserEmail,
  getUserProfile,
  updateUser,
  updatePassword,
};

module.exports = userRepository;
