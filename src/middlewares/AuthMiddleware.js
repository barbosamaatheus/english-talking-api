/* eslint-disable consistent-return */
require("dotenv").config();

const JwtManager = require("../utils/jwtManager");

const Response = require("../utils/responses");

module.exports = async (req, res, next) => {
  const jwt = new JwtManager();

  const response = new Response(res);
  const { entities } = response;

  const badRequest = response
    .isError()
    .entity(entities.USER)
    .code(response.UNAUTHORIZED_401);

  const authHeader = req.headers.authorization;

  if (!authHeader) return badRequest.message("No token provider").send();

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return badRequest.message("Token error").send();

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return badRequest.message("Token malformatted").send();

  try {
    const decoded = await jwt.verify(token);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    badRequest.message("Token invalid").send();
  }
};
