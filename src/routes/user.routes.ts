import { Router } from "express";

import getUserController from "../controllers/userControllers";

const userRoutes = Router();

userRoutes.route("/register")
  .post(getUserController().register);

  userRoutes.route("/login")
  .get(getUserController().login);

export default userRoutes;