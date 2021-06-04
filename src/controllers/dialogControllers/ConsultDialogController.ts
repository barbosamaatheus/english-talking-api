import { Request, Response } from "express";

import ConsultDialogService from "../../services/dialogServices/ConsultDialogService";

export default class ConsultDialogController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { limit, page } = request.headers;
    const { where } = request;

    const options = {
      limit: parseInt(limit as string, 10) || 10,
      page: parseInt(page as string, 10) || 1,
    };

    const consultDialogService = new ConsultDialogService();
    const { dialogues, count } = await consultDialogService.execute({
      limit: options.limit,
      page: options.page,
      where
    });
      
    return response
      .header("x-total-count", `${count}`)
      .status(200)
      .json(dialogues);
  }
}