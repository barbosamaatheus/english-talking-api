require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

module.exports = (params = {}) =>
  jwt.sign(params, SECRET_KEY, { expiresIn: 86400 });
