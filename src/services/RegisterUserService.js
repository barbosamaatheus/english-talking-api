const User = require("../models/User");

const Response = require("../utils/responses");

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
    const isValidationError = err.name === "ValidationError";

    const response = new Response(res);
    const { entities } = response;

    const code = isValidationError
      ? response.INVALID_REQUEST
      : response.INTERNAL_ERROR;

    const message = isValidationError ? err.message : "Registration failed";

    return response
      .isError()
      .entity(entities.USER)
      .code(code)
      .message(message)
      .send();
  }
};
