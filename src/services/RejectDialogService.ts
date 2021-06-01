import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";
import { Status } from "../utils/enumStatus";
import calculatesApprovalRate from "../utils/calculatesApprovalRate";
import User from "../models/User";

export default async function RejectDialogService(
  req: Request,
  res: Response
): Promise<ResponseHandler> {
  const userRepository = getRepository(User);
  const dialogRepository = getRepository(Dialog);

  const response = new ResponseHandler(res);
  const { entities } = response;

  const { dialogId } = req.params;
  const { userId } = req;

  try {
    const dialogue = await dialogRepository.findOne(dialogId, {
      relations: ["approvals", "disapprovals"],
    });
    const user = await userRepository.findOne(userId);

    if (!dialogue)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.NOT_FOUND_404)
        .message("Resource not found")
        .send();

    dialogue.approvals = dialogue.approvals.filter((item) => {
      return item.id !== userId;
    });

    const userHasDisapproved = dialogue.disapprovals.filter((item) => {
      return item.id === userId;
    });

    const alreadyDisapproved = userHasDisapproved.length > 0;

    if (alreadyDisapproved)
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("The user has already disapproved of this dialog")
        .send();

    dialogue.disapprovals.push(user as User);

    const { approvals, disapprovals } = dialogue;
    if (calculatesApprovalRate({ approvals, disapprovals }) < 70)
      dialogue.status = Status.ANALYZING;

    await dialogRepository.save(dialogue);

    return response
      .entity(entities.DIALOG)
      .code(response.NO_CONTENT_204)
      .send();
  } catch (error) {
    const isValidationError = error.name === "QueryFailedError";

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
