const { getUser } = require("./user.repository");
const userService = require("./user.service");

const createUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    const newUser = await userService.createUser({
      username,
      fullname,
      email,
      password,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.auth.id;
  try {
    const getUserProfile = await userService.getUser({
      userId,
    });
    return res.status(200).json(getUserProfile);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.auth.id;
  const { fullName, email, password } = req.body;
  try {
    const updateDataUser = await userService.updateUser({
      userId,
      fullName,
      email,
      password,
    });
    return res.status(200).json(updateDataUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  createUser,
  getUserProfile,
  updateUser,
};

module.exports = userController;
