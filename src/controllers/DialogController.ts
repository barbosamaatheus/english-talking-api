import { Request, Response } from "express";
import CreateDialogService from "../services/CreateDialogService";
import ConsultDialogService from "../services/ConsultDialogService";

export default {
  async index(req: Request, res: Response) {
    const response = await ConsultDialogService(req, res);
    return response;
  },

  async store(req: Request, res: Response) {
    const response = await CreateDialogService(req, res);
    return response;
  },
};
