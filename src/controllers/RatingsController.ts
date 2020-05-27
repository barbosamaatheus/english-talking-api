import ApprovalDialogService from "../services/ApprovalDialogService";
import RejectDialogService from "../services/RejectDialogService";

import { IRequest, IResponse } from "../http.d";

export default {
  async approval(req: IRequest, res: IResponse) {
    const response = await ApprovalDialogService(req, res);
    return response;
  },

  async reject(req: IRequest, res: IResponse) {
    const response = await RejectDialogService(req, res);
    return response;
  },
};
