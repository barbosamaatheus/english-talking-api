const express = require("express");

const AuthMiddleware = require("./middlewares/AuthMiddleware");

const SessionController = require("./controllers/SessionController");
const DialogController = require("./controllers/DialogController");
const RatingsController = require("./controllers/RatingsController");

const routes = express.Router();

routes.post("/v1/register", SessionController.register);
routes.post("/v1/authenticate", SessionController.authenticate);

routes.get("/v1/dialog", DialogController.index);
routes.post("/v1/dialog", AuthMiddleware, DialogController.store);
routes.put(
  "/v1/dialog/:dialogId/approval",
  AuthMiddleware,
  RatingsController.approval
);
routes.put(
  "/v1/dialog/:dialogId/reject",
  AuthMiddleware,
  RatingsController.reject
);

module.exports = routes;
