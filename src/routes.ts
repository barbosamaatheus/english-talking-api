import { Router } from "express";

import AuthMiddleware from "./middlewares/AuthMiddleware";
import QueryMiddleware from "./middlewares/QueryMiddleware";

import SessionController from "./controllers/SessionController";
import DialogController from "./controllers/DialogController";
import RatingsController from "./controllers/RatingsController";

const routes = Router();

routes.post("/register", SessionController.register);
routes.get("/authenticate", SessionController.authenticate);

routes.route("/dialog")
  .get(QueryMiddleware, DialogController.index)
  .post(AuthMiddleware, DialogController.store);

routes.put(
  "/dialog/:dialogId/approval",
  AuthMiddleware,
  RatingsController.approval
);

routes.put(
  "/dialog/:dialogId/reject",
  AuthMiddleware,
  RatingsController.reject
);

export default routes;
