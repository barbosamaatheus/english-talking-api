const Dialog = require("../models/Dialog");

function parserPageArgs(property, value) {
  const passed = parseInt(value, 10);
  if (property === "limit") {
    if (Number.isNaN(passed) || !passed) return 10;
  } else if (Number.isNaN(passed) || !passed) return 1;
  return passed;
}

module.exports = async (req, res) => {
  const { limit, page } = req.headers;

  const options = {
    limit: parserPageArgs("limit", limit),
    page: parserPageArgs("page", page),
  };
  const dialogues = await Dialog.find(req.query, null, {
    limit: options.limit,
    skip: (options.page - 1) * options.limit,
  }).catch((error) =>
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Dialog consultation failed" })
  );
  if (!dialogues) return res.status(404).send();

  const response = dialogues.map((element) => {
    return {
      // eslint-disable-next-line dot-notation
      ...element["_doc"],
      approval_rate: element.approval_rate,
    };
  });

  const count = await Dialog.countDocuments(req.query);
  res.header("X-Total-Count", count);

  return res.status(200).json(response);
};
