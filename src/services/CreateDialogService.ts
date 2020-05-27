import { Request as ExpressRequest, Response } from "express";
import { Schema } from "mongoose";

import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

interface Request extends ExpressRequest {
  userId?: Schema.Types.ObjectId;
}

export default async function CreateDialogService(req: Request, res: Response) {
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
