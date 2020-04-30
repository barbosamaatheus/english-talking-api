/* eslint-disable consistent-return */
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provider" });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).json({ error: "Token error" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).json({ error: "Token malformatted" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  });
};
