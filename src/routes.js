const express = require("express");

const AuthMiddleware = require("./middlewares/AuthMiddleware");

const DialogController = require("./controllers/DialogController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/v1/register", SessionController.register);
routes.post("/v1/authenticate", SessionController.authenticate);

routes.post("/v1/dialog", AuthMiddleware, DialogController.store);

module.exports = routes;
