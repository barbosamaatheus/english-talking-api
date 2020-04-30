const RegisterUserService = require("../services/RegisterUserService");
const AuthenticationUserService = require("../services/AuthenticationUserService");

module.exports = {
  async register(req, res) {
    const response = await RegisterUserService(req, res);
    return response;
  },
  async authenticate(req, res) {
    const response = await AuthenticationUserService(req, res);
    return response;
  },
};
