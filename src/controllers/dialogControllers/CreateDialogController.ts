import { Request, Response } from "express";

import CreateDialogService from "../../services/dialogServices/CreateDialogService";

export default class CreateDialogController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { speech, answer } = request.body;
    const { userId } = request;

    const createDialogService = new CreateDialogService();
    await createDialogService.execute({ speech, answer }, userId);

    return response.status(201).end();
  }
}