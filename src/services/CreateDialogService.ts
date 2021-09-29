import { getRepository } from "typeorm";
import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

import { Status } from "../utils/enumStatus";

import { IRequest, IResponse } from "../@types/http";
import DialogView from "../views/DialogView";

export default async function CreateDialogService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const dialogRepository = getRepository(Dialog);

  const response = new ResponseHandler(res);

  const { entities } = response;

  try {
    const { speech, answer } = req.body;
    if (!speech || !answer)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.BAD_REQUEST_400)
        .message("Speech or Answer not sent")
        .send();

    const data = {
      speech: speech.toLowerCase().trim(),
      answer: answer.toLowerCase().trim(),
      owner: req.userId,
      status: Status.ANALYZING,
      approvals: [],
      disapprovals: [],
    };

    const dialog = dialogRepository.create(data);
    await dialogRepository.save(dialog);

    return response
      .entity(entities.DIALOG)
      .code(response.CREATED_201)
      .data(DialogView.render(dialog))
      .send();
  } catch (error: any) {
    const isValidationError = error.name === "QueryFailedError";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(
        isValidationError
          ? response.BAD_REQUEST_400
          : response.INTERNAL_SERVER_ERROR_500
      )
      .message(isValidationError ? error.message : "Dialog creation failed")
      .send();
  }
}
