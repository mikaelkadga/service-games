const emailService = require("./email.service");

const send = async (req, res) => {
  const { msg, email} = req.body;
  try {
    await emailService.send(msg, email);
    return res.send("success");
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const emailController = {
  send,
};

module.exports = emailController;