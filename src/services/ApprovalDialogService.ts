import { getRepository } from "typeorm";
import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";
import User from "../models/User";
import { Status } from "../utils/enumStatus";
import { IRequest, IResponse, UserID } from "../@types/http";
import calculatesApprovalRate from "../utils/calculatesApprovalRate";

export default async function ApprovalDialogService(
  req: IRequest,
  res: IResponse
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

    if (!dialogue)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.NOT_FOUND_404)
        .message("Resource not found")
        .send();

    dialogue.disapprovals = dialogue.disapprovals.filter((item) => {
      return item.id !== userId;
    });

    const userHasApproved = dialogue.approvals.filter((item) => {
      return item.id === userId;
    });

    const alreadyApproved = userHasApproved.length > 0;

    if (alreadyApproved)
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("User has already approved this dialog")
        .send();

    const user = await userRepository.findOne(userId);
    dialogue.approvals.push(user as User);

    const { approvals, disapprovals } = dialogue;
    if (calculatesApprovalRate({ approvals, disapprovals }) >= 70)
      dialogue.status = Status.APPROVED;

    await dialogRepository.save(dialogue);

    return response
      .entity(entities.DIALOG)
      .code(response.NO_CONTENT_204)
      .send();
  } catch (error: any ) {
    
    const isValidationError = error.name === "QueryFailedError";

    const code = isValidationError
      ? response.BAD_REQUEST_400
      : response.INTERNAL_SERVER_ERROR_500;

    const message = isValidationError
      ? error.message
      : "Dialog approvel failed";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(code)
      .message(message)
      .send();
  }
}
