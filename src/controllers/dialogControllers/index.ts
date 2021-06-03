import CreateDialogController from "./CreateDialogController";
import ConsultDialogController from "./ConsultDialogController";
import ApprovalDialogController from "./ApproveDialogController";
import RejectDialogController from "./RejectDialogController";

export default () => {
  const store = new CreateDialogController().handle;
  const list = new ConsultDialogController().handle;
  const approve = new ApprovalDialogController().handle;
  const reject = new RejectDialogController().handle;

  return { store, list, approve, reject };
};