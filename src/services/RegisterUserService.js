const User = require("../models/User");

const Response = require("../utils/responses");

const JwtManager = require("../utils/jwtManager");

module.exports = async (req, res) => {
  const jwt = new JwtManager();

  const response = new Response(res);
  const { entities } = response;

  try {
    const { name, picture, email, password } = req.body;

    if (await User.findOne({ email }))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.BAD_REQUEST_400)
        .message("User already exists")
        .send();

    const user = await User.create({
      name,
      picture,
      email,
      password,
    });

    user.password = undefined;

    return response
      .entity(entities.USER)
      .code(response.CREATED_201)
      .data({ user })
      .metadata({
        token: jwt.generate({ id: user.id }),
      })
      .send();
  } catch (error) {
    const isValidationError = error.name === "ValidationError";

    const code = isValidationError
      ? response.BAD_REQUEST_400
      : response.INTERNAL_SERVER_ERROR_500;

    const message = isValidationError ? error.message : "Registration failed";

    return response
      .isError()
      .entity(entities.USER)
      .code(code)
      .message(message)
      .send();
  }
};
