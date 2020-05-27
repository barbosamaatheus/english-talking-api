import { ResponseHandler } from "../utils/ResponseHandler";
import Dialog from "../models/Dialog";

import { IRequest, IResponse } from "../http.d";

export default async function ConsultDialogService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const { limit, page } = req.headers;

  const options = {
    limit: parseInt(limit as string, 10) || 10,
    page: parseInt(page as string, 10) || 1,
  };

  const response = new ResponseHandler(res);
  const { entities } = response;

  try {
    const dialogues = await Dialog.find(req.query, null, {
      limit: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    const count = await Dialog.countDocuments(req.query);
    res.header("X-Total-Count", `${count}`);

    if (!count)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.NOT_FOUND_404)
        .message("Resource not found")
        .send();

    const data = dialogues.map((element) => {
      return {
        // eslint-disable-next-line dot-notation
        ...element["_doc"],
        approval_rate: element.approval_rate,
      };
    });

    return response
      .entity(entities.DIALOG)
      .code(response.OK_200)
      .data(data)
      .send();
  } catch (err) {
    const isValidationError = err.name === "ValidationError";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(
        isValidationError
          ? response.BAD_REQUEST_400
          : response.INTERNAL_SERVER_ERROR_500
      )
      .message(isValidationError ? err.message : "Dialog consultation failed")
      .send();
  }
}
