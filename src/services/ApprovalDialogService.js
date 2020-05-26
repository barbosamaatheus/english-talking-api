const Dialog = require("../models/Dialog");
const Response = require("../utils/responses");

module.exports = async (req, res) => {
  const response = new Response(res);
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

    const index = dialogue.disapprovals.indexOf(userId);

    if (index > -1) dialogue.disapprovals.splice(index, 1);

    if (dialogue.approvals.includes(userId))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("User has already approved this dialog")
        .send();

    dialogue.approvals.push(userId);

    if (dialogue.approval_rate >= 70) dialogue.status = "approved";

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
      : "Dialog approvel failed";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(code)
      .message(message)
      .send();
  }
};
