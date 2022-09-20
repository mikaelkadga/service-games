const userRepo = require("./user.repository");
const bcrypt = require("bcrypt");
const saltRound = 10;

const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);

  return await userRepo.createUser({
    fullname,
    email,
    password: hashPassword,
  });
};

const getUserProfile = async ({ email }) => {
  return await userRepo.getUserProfile({
    email,
  });
};

const updateUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  return await userRepo.updateUser({
    fullname,
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
