const Dialog = require("../models/Dialog");
const Response = require("../utils/responses");

module.exports = async (req, res) => {
  const { limit, page } = req.headers;

  const options = {
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
  };

  const response = new Response(res);
  const { entities } = response;

  try {
    const dialogues = await Dialog.find(req.query, null, {
      limit: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    const count = await Dialog.countDocuments(req.query);
    res.header("X-Total-Count", count);

    if (!count)
      return response
        .isError()
        .entity(entities.DIALOG)
        .code(response.RESOURCE_NOT_FOUND)
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
      .code(response.SUCCESS_GET)
      .data(data)
      .send();
  } catch (err) {
    const isValidationError = err.name === "ValidationError";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(
        isValidationError ? response.INVALID_REQUEST : response.INTERNAL_ERROR
      )
      .message(isValidationError ? err.message : "Dialog consultation failed")
      .send();
  }
};
