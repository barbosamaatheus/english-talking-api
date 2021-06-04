import { Request, Response } from "express";

import RejectDialogService from "../../services/dialogServices/RejectDialogService";

export default class RejectDialogController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { dialogId } = request.params;
    const { userId } = request;

    const approveDialogService = new RejectDialogService();
    await approveDialogService.execute({ userId, dialogId });

    return response.status(204).end();
  }
}