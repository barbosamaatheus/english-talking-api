const CreateDialogService = require("../services/CreateDialogService");
const ConsultDialogService = require("../services/ConsultDialogService");

module.exports = {
  async store(req, res) {
    const response = await CreateDialogService(req, res);
    return response;
  },

  async index(req, res) {
    const response = await ConsultDialogService(req, res);
    return response;
  },
};
