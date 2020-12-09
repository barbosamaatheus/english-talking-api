import { getRepository } from "typeorm";
import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

import { IRequest, IResponse } from "../@types/http";
import DialogView from "../views/DialogView";

export default async function ConsultDialogService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const dialogRepository = getRepository(Dialog);
  const { limit, page } = req.headers;

  const options = {
    limit: parseInt(limit as string, 10) || 10,
    page: parseInt(page as string, 10) || 1,
  };

  const response = new ResponseHandler(res);
  const { entities } = response;

  try {
    const findAndCount = await dialogRepository.findAndCount({
      relations: ["approvals", "disapprovals", "owner"],
      where: req.query,
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    const [dialogues, count] = findAndCount;
    res.header("X-Total-Count", `${count}`);

    if (!count)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.NOT_FOUND_404)
        .message("Resource not found")
        .send();

    return response
      .entity(entities.DIALOG)
      .code(response.OK_200)
      .data(DialogView.renderMany(dialogues))
      .send();
  } catch (error) {
    res.header("x-total-count", "0");
    const isValidationError = error.name === "QueryFailedError";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(
        isValidationError
          ? response.BAD_REQUEST_400
          : response.INTERNAL_SERVER_ERROR_500
      )
      .message(isValidationError ? error.message : "Dialog consultation failed")
      .send();
  }
}
