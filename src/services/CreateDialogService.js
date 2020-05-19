const Dialog = require("../models/Dialog");

// const Response = require("../utils/responses");

module.exports = async (req, res) => {
  // const response = new Response(res);

  // const { entities } = response;

  try {
    const dialog = await Dialog.create({
      ...req.body,
      user: req.userId,
    });

    return res.status(201).json(dialog);
  } catch (error) {
    return error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Dialog creation failed" });
  }
};
