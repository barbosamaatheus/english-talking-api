import Dialog from "../models/Dialog";
import calculatesApprovalRate from "../utils/calculatesApprovalRate";
import captalize from "../utils/captalize";
import User from "../models/User";

function renderEvaluation(users: User[]) {
  return users.map((user) => user.id);
}

export default {
  render(dialog: Dialog) {
    const { approvals, disapprovals } = dialog;
    return {
      id: dialog.id,
      speech: captalize(dialog.speech),
      answer: captalize(dialog.answer),
      status: dialog.status,
      approval_rate: calculatesApprovalRate({ approvals, disapprovals }),
      owner: dialog.owner.id || dialog.owner,
      approvals: renderEvaluation(dialog.approvals),
      disapprovals: renderEvaluation(dialog.disapprovals),
      createdAt: dialog.createdAt,
      updatedAt: dialog.updatedAt,
    };
  },

  renderMany(dialogs: Dialog[]) {
    return dialogs.map((dialog) => this.render(dialog));
  },
};
