const CreateDialogService = require("../services/CreateDialogService");

module.exports = {
  async store(req, res) {
    const response = await CreateDialogService(req, res);
    return response;
  },
};
