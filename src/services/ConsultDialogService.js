const Dialog = require("../models/Dialog");

module.exports = async (req, res) => {
  const { limit, page } = req.headers;

  const options = {
    limit: parseInt(limit, 10) || 10,
    page: parseInt(page, 10) || 1,
  };
  try {
    const dialogues = await Dialog.find(req.query, null, {
      limit: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    const count = await Dialog.countDocuments(req.query);
    res.header("X-Total-Count", count);

    if (!count) return res.status(404).send();

    const response = dialogues.map((element) => {
      return {
        // eslint-disable-next-line dot-notation
        ...element["_doc"],
        approval_rate: element.approval_rate,
      };
    });
    return res.status(200).json(response);
  } catch (err) {
    return err.name === "ValidationError"
      ? res.status(400).json({ error: err.message })
      : res.status(500).json({ error: "Dialog consultation failed" });
  }
};
