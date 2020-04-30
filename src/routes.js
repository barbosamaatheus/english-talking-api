const express = require("express");
const DialogController = require("./controllers/DialogController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json();
});

routes.post("/dialog", DialogController.store);

module.exports = routes;
