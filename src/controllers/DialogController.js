const CreateDialogService = require("../services/CreateDialogService");
const ConsultationDialogueService = require("../services/ConsultationDialogueService");

module.exports = {
  async store(req, res) {
    const response = await CreateDialogService(req, res);
    return response;
  },

  async index(req, res) {
    const response = await ConsultationDialogueService(req, res);
    return response;
  },
};
