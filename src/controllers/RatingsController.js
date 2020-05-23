const ApprovalDialogService = require("../services/ApprovalDialogService");
const RejectDialogService = require("../services/RejectDialogService");

module.exports = {
  async approval(req, res) {
    const response = await ApprovalDialogService(req, res);
    return response;
  },
  async reject(req, res) {
    const response = await RejectDialogService(req, res);
    return response;
  },
};
