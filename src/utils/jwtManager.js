require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

class JwtManager {
  constructor() {
    this.SECRET_KEY = SECRET_KEY;
  }

  generate(params = {}) {
    return jwt.sign(params, this.SECRET_KEY, { expiresIn: 86400 });
  }

  vefy(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.SECRET_KEY, (error, decoded) => {
        if (error) return reject(error);

        return resolve(decoded);
      });
    });
  }
}

module.exports = JwtManager;
