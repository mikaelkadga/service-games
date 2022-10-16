const emailService = require("./email.service");

const send = async (req, res) => {
  const { email } = req.body;
  const host = req.header('Host');
  try {
    await emailService.send(host, email);
    return res.send("success");
  } catch (e) {
    return res.status(e.code).send(e.message);
  }
};

const emailController = {
  send,
};

module.exports = emailController;