import { Router } from "express";

import AuthMiddleware from "./middlewares/AuthMiddleware";

import SessionController from "./controllers/SessionController";
import DialogController from "./controllers/DialogController";
import RatingsController from "./controllers/RatingsController";

const routes = Router();

routes.post("/v1/register", SessionController.register);
routes.get("/v1/authenticate", SessionController.authenticate);

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

export default routes;
