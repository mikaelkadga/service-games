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
  const userId = req.auth.id;
  try {
    const getUserProfile = await userService.getUserProfile({
      userId,
    });
    return res.status(200).json(getUserProfile);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.auth.id;
  const { fullname, email, password } = req.body;
  try {
    const updateDataUser = await userService.updateUser({
      userId,
      fullname,
      email,
      password,
    });
    return res.status(200).json(updateDataUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmpassword } = req.body;
  if(password != confirmpassword){
    return res.status(400).json({ message: "Password is not matched"});
  }
  const userId = req.auth.payload.id;
  try {
    const resetPassword = await userService.resetPassword({userId, password, confirmpassword});
    return res.status(200).json(resetPassword);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  createUser,
  getUserProfile,
  updateUser,
  resetPassword
};

module.exports = userController;
