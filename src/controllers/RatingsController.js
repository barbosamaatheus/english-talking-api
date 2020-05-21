const ApprovalDialogService = require("../services/ApprovalDialogService");

module.exports = {
  async approval(req, res) {
    const response = await ApprovalDialogService(req, res);
    return response;
  },
};
