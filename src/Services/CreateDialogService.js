const Dialog = require("../models/Dialog");

module.exports = async (req, res) => {
  const { speech, answer } = req.body;

  const response = await Dialog.create({ speech, answer })
    .then((item) => res.status(201).json(item))
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(400).json(error.errors)
        : res.status(500).json(error)
    );

  return response;
};
