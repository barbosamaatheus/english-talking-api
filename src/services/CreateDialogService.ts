import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

import { IRequest, IResponse } from "../types/http";

export default async function CreateDialogService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const response = new ResponseHandler(res);

  const { entities } = response;

  try {
    const { speech, answer } = req.body;

    const dialog = await Dialog.create({
      speech,
      answer,
      user: req.userId,
    });

    return response
      .entity(entities.DIALOG)
      .code(response.CREATED_201)
      .data(dialog)
      .send();
  } catch (error) {
    const isValidationError = error.name === "ValidationError";

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
