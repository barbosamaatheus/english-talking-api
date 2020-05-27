import { Request as ExpressRequest, Response } from "express";
import { Schema } from "mongoose";

import CreateDialogService from "../services/CreateDialogService";
import ConsultDialogService from "../services/ConsultDialogService";

interface Request extends ExpressRequest {
  userId?: Schema.Types.ObjectId;
}

class DialogController {
  async store(req: Request, res: Response) {
    const response = await CreateDialogService(req, res);
    return response;
  }

  async index(req: Request, res: Response) {
    const response = await ConsultDialogService(req, res);
    return response;
  }
}

export default new DialogController();
