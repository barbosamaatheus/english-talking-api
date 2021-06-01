import { Request, Response } from "express";
import ApprovalDialogService from "../services/ApprovalDialogService";
import RejectDialogService from "../services/RejectDialogService";


export default {
  async approval(req: Request, res: Response) {
    const response = await ApprovalDialogService(req, res);
    return response;
  },

  async reject(req: Request, res: Response) {
    const response = await RejectDialogService(req, res);
    return response;
  },
};
