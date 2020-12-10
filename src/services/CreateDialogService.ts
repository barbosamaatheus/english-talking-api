import { getRepository } from "typeorm";
import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";
import User from "../models/User";
import { Status } from "../utils/enumStatus";

import { IRequest, IResponse } from "../@types/http";
import DialogView from "../views/DialogView";

export default async function CreateDialogService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const dialogRepository = getRepository(Dialog);
  const userRepository = getRepository(User);
  const response = new ResponseHandler(res);

  const { entities } = response;

  try {
    const { speech, answer } = req.body;

    const data = {
      speech: speech.toLowerCase(),
      answer: answer.toLowerCase(),
      owner: req.userId,
      status: Status.ANALYZING,
      approvals: [],
      disapprovals: [],
    };

    console.log(data);

    const dialog = dialogRepository.create(data);
    await dialogRepository.save(dialog);

    return response
      .entity(entities.DIALOG)
      .code(response.CREATED_201)
      .data(DialogView.render(dialog))
      .send();
  } catch (error) {
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
