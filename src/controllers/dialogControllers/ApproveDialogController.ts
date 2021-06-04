import { Request, Response } from "express";

import ApproveDialogService from "../../services/dialogServices/ApproveDialogService";

export default class ApproveDialogController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { dialogId } = request.params;
    const { userId } = request;

    const approveDialogService = new ApproveDialogService();
    await approveDialogService.execute({ userId, dialogId })

    return response.status(204).end();
  }
}