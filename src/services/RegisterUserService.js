const User = require("../models/User");

const jwtGenerate = require("../utils/jwtGenerate");

module.exports = async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.status(201).json({ user, token: jwtGenerate({ id: user.id }) });
  } catch (err) {
    const error =
      err.name === "ValidationError"
        ? res.status(400).json({ error: err.message })
        : res.status(500).json({ error: "Registration failed" });

    return error;
  }
};
