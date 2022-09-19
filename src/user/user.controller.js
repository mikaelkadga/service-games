const userService = require("./user.service");

const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = await userService.createUser({
      fullName,
      email,
      password,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  createUser
};

module.exports = userController;
