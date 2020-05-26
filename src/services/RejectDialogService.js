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

    const index = dialogue.approvals.indexOf(userId);
  if (index > -1) dialogue.approvals = dialogue.approvals.splice(index, 1);
      dialogue.approvals = dialogue.approvals.splice(index, 1);
    }

    if (dialogue.disapprovals.includes(userId))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("The user has already disapproved of this dialog")
        .send();

    dialogue.disapprovals.push(userId);

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
};
