import { Router } from "express";

import authMiddleware from "../middlewares/AuthMiddleware";
import queryMiddleware from "../middlewares/QueryMiddleware";
import getDialogController from "../controllers/dialogControllers";

const dialogRoutes = Router();

dialogRoutes.route("/")
  .get(
    queryMiddleware.exec,
    getDialogController().list
  )
  .post(
    authMiddleware.exec,
    getDialogController().store
  );

dialogRoutes.route("/:dialogId/approve")  
  .patch(
    authMiddleware.exec,
    getDialogController().approve
  );

dialogRoutes.route("/:dialogId/disapprove")  
  .patch(
    authMiddleware.exec,
    getDialogController().reject
  );

export default dialogRoutes;