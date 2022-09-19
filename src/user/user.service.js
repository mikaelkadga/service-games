const userRepo = require("./user.repository");
const bcrypt = require("bcrypt");
const saltRound = 10;

const createUser = async ({ username, fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);

  return await userRepo.createUser({
    username,
    fullname,
    email,
    password: hashPassword,
  });
};

const getUserProfile = async ({ userId }) => {
  return await userRepo.getUserProfile({
    userId,
  });
};

const updateUser = async ({ fullName, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  return await userRepo.updateUser({
    userId,
    fullName,
    email,
    password: hashPassword,
  });
};

const userService = {
  createUser,
  getUserProfile,
  updateUser,
};

module.exports = userService;
