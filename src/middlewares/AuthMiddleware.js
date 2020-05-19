/* eslint-disable consistent-return */
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Response = require("../utils/responses");

const { SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const response = new Response(res);
  const { entities } = response;

  const badRequest = response
    .isError()
    .entity(entities.USER)
    .code(response.INVALID_AUTH);

  const authHeader = req.headers.authorization;

  if (!authHeader) return badRequest.message("No token provider").send();

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return badRequest.message("Token error").send();

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return badRequest.message("Token malformatted").send();

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return badRequest.message("Token invalid").send();

    req.userId = decoded.id;
    return next();
  });
};
