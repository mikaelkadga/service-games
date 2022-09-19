const { json } = require("body-parser");
const { User } = require("../database/models");

const createUser = async ({ fullName, email, password }) => {
  const isUserExists = await User.findOne({ where: { email }, raw: true });
  if (!isUserExists) {
    return await User.create({
      fullName,
      email,
      password,
    });
  } else {
    return json({ message: error.message });
  }
};

const getUser = async ({ username }) => {
  return await User.findOne({ where: { username }, raw: true });
};

const getUserEmail = async ({ email }) => {
  return await User.findOne({ where: { email }, raw: true });
};

const getUserProfile = async ({ userId }) => {
  return await User.findOne({ where: { userId }, raw: true });
};

const updateUser = async ({ userId, fullName, email, password }) => {
  return await User.update(
    {
      fullName,
      email,
      password,
    },
    {
      where: {
        id: userId,
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
};

module.exports = userRepository;
