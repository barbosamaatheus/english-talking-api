const RegisterUserService = require("../Services/RegisterUserService");
const AuthenticationUserService = require("../Services/AuthenticationUserService");

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
