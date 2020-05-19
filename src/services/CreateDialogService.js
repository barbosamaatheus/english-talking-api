const Dialog = require("../models/Dialog");

const Response = require("../utils/responses");

module.exports = async (req, res) => {
  const response = new Response(res);

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
      .code(response.SUCCESS_POST)
      .data(dialog)
      .send();
  } catch (error) {
    const isValidationError = error.name === "ValidationError";

    return response
      .isError()
      .entity(entities.DIALOG)
      .code(
        isValidationError ? response.INVALID_REQUEST : response.INTERNAL_ERROR
      )
      .message(isValidationError ? error.message : "Dialog creation failed")
      .send();
  }
};
