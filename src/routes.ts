import { Router } from "express";

import AuthMiddleware from "./middlewares/AuthMiddleware";
import QueryMiddleware from "./middlewares/QueryMiddleware";

import DialogController from "./controllers/DialogController";
import RatingsController from "./controllers/RatingsController";

import UserController from './controllers/userControllers'

const routes = Router();

routes.post("/register", UserController().register);
routes.get("/authenticate", UserController().authenticate);

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
