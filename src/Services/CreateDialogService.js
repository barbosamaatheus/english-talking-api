const Dialog = require("../models/Dialog");

module.exports = async (req, res) => {
  const response = await Dialog.create({ ...req.body, user: req.userId })
    .then((item) => res.status(201).json(item))
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(400).json({ error: error.message })
        : res.status(500).json({ error: "Dialog creation failed" })
    );

  return response;
};
