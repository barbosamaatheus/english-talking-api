const bcrypt = require("bcrypt");
const Response = require("../utils/responses");
const User = require("../models/User");

const JwtManager = require("../utils/jwtManager");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  const jwt = new JwtManager();

  const response = new Response(res);
  const { entities } = response;

  if (!user)
    return response
      .isError()
      .entity(entities.USER)
      .code(response.RESOURCE_NOT_FOUND)
      .message("User not found")
      .send();

  if (!password || !(await bcrypt.compare(password, user.password)))
    return response
      .isError()
      .entity(entities.USER)
      .code(response.INVALID_REQUEST)
      .message("Invalid Password")
      .send();

  user.password = undefined;

  return response
    .entity(entities.USER)
    .code(response.SUCCESS_GET)
    .data({ user })
    .metadata({ token: jwt.generate({ id: user.id }) })
    .send();
};
