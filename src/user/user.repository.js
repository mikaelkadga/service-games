const { json } = require("body-parser");
const { User } = require("../database/models");

const createUser = async ({ username, fullname, email, password }) => {
  const isUserExists = await User.findOne({ where: { email }, raw: true });
  if (!isUserExists) {
    return await User.create({
      username,
      fullname,
      email,
      password,
    });
  }else {
    return json({ message: error.message});
  }
};

const getUser = async ({ username }) => {
  return await User.findOne({ where: { username }, raw: true });
};

const getUserEmail = async ({email}) => {
  return await User.findOne({where: {email}, raw: true});
}

const userRepository = {
  createUser,
  getUser,
  getUserEmail,
};

module.exports = userRepository;
