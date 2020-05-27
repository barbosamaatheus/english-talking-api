import { Request as ExpressRequest, Response } from "express";
import { Schema } from "mongoose";

import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

type UserID = Schema.Types.ObjectId;

interface Request extends ExpressRequest {
  userId?: UserID;
}

export default async function RejectDialogService(req: Request, res: Response) {
  const response = new ResponseHandler(res);
  const { entities } = response;

  const { dialogId } = req.params;
  const { userId } = req;

  try {
    const dialogue = await Dialog.findById(dialogId);

    if (!dialogue)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.NOT_FOUND_404)
        .message("Resource not found")
        .send();

    const index = dialogue.approvals.indexOf(userId as UserID);

    if (index > -1) dialogue.approvals.splice(index, 1);

    if (dialogue.disapprovals.includes(userId as UserID))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("The user has already disapproved of this dialog")
        .send();

    dialogue.disapprovals.push(userId as UserID);

    if (dialogue.approval_rate < 70) dialogue.status = "analyzing";

    await dialogue.save();

    return response
      .entity(entities.DIALOG)
      .code(response.NO_CONTENT_204)
      .send();
  } catch (error) {
    const isValidationError = error.name === "ValidationError";

    const code = isValidationError
      ? response.BAD_REQUEST_400
      : response.INTERNAL_SERVER_ERROR_500;

    const message = isValidationError
      ? error.message
      : "Dialog Disapprovel failed";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(code)
      .message(message)
      .send();
  }
}
