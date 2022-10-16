require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require("./auth.service");

const login = async (req, res) => {
    const { email, password } = req.body;
    const existUser = await authService.findUser(email);
    
    //   email checking
    if (!existUser) return res.status(404).json({ message: "User not found" });
  
    //   password checking
    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (isPasswordCorrect) {
      // generating jwt
      const token = await jwt.sign(
        {
          id: existUser.userId,
          fullname: existUser.fullname,
          email: existUser.email
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "1d" }
      );
      return res.status(200).json({accessToken: token});
    } else {
      return res.status(500).json({message: "Login failed"});
    }
  }

  const authController = {
      login
  }

  module.exports = authController