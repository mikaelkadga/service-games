const { getUser } = require("./user.repository");
const userService = require("./user.service");

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const newUser = await userService.createUser({
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
  const { email} = req.body;
  try {
    const getUserProfile = await userService.getUser({
      email,
    });
    return res.status(200).json(getUserProfile);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const updateDataUser = await userService.updateUser({
      fullname,
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
