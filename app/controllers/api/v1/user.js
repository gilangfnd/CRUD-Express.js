const { User } = require("../../../models");
const {
  checkPassword,
  encryptPassword,
} = require("../../../../utils/auth");

module.exports = {
  login(req, res) {},

  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const encryptedPassword = await encryptPassword(password);
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      });
      return res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (e) {
      res.status(400).json({
        status: "FAIL",
        message: e.message,
      });
    }
  },
};