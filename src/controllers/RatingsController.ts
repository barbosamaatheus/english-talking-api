import { Request as ExpressRequest, Response } from "express";
import { Schema } from "mongoose";

import ApprovalDialogService from "../services/ApprovalDialogService";
import RejectDialogService from "../services/RejectDialogService";

interface Request extends ExpressRequest {
  userId?: Schema.Types.ObjectId;
}

class RatingsController {
  async approval(req: Request, res: Response) {
    const response = await ApprovalDialogService(req, res);
    return response;
  }
  async reject(req: Request, res: Response) {
    const response = await RejectDialogService(req, res);
    return response;
  }
}

export default new RatingsController();
