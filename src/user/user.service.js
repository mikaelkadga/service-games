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

const getUserProfile = async ({ userId }) => {
  return await userRepo.getUserProfile({
    userId,
  });
};

const updateUser = async ({ userId, fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  return await userRepo.updateUser({
    userId,
    fullname,
    email,
    password: hashPassword,
  });
};

const resetPassword = async ({ userId, password, confirmpassword }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);
  return await userRepo.updatePassword({
    userId,
    password: hashPassword,
  });
};

const userService = {
  createUser,
  getUserProfile,
  updateUser,
  resetPassword
};

module.exports = userService;
