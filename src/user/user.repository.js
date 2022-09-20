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

const getUser = async ({ email }) => {
  return await User.findOne({ where: { email }, raw: true });
};

const getUserProfile = async ({ email }) => {
  return await User.findOne({ where: { email }, raw: true });
};

const updateUser = async ({ fullname, password }) => {
  return await User.update(
    {
      fullname,
      password,
    },
    {
      where: {
        email: email,
      },
      returning: true,
    }
  );
};

const userRepository = {
  createUser,
  getUser,
  getUserProfile,
  updateUser,
};

module.exports = userRepository;
