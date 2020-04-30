const bcrypt = require("bcrypt");
const User = require("../models/User");

const jwtGenerate = require("../utils/jwtGenerate");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).json({ error: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: "Invalid Password" });

  user.password = undefined;

  return res.status(201).json({ user, token: jwtGenerate({ id: user.id }) });
};
