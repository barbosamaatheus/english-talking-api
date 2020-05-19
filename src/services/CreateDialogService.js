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
};
