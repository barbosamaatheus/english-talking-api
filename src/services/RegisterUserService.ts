import { Request, Response } from "express";

import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import User from "../models/User";

export default async function RegisterUserService(req: Request, res: Response) {
  const jwt = new JwtManager();

  const response = new ResponseHandler(res);
  const { entities } = response;

  try {
    const { name, picture, email, password } = req.body;

    if (await User.findOne({ email }))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("User already exists")
        .send();

    const user = await User.create({
      name,
      picture,
      email,
      password,
    });

    user.password = undefined;

    return response
      .entity(entities.USER)
      .code(response.CREATED_201)
      .data({ user })
      .metadata({
        token: jwt.generate({ id: user.id }),
      })
      .send();
  } catch (error) {
    const isValidationError = error.name === "ValidationError";

    const code = isValidationError
      ? response.BAD_REQUEST_400
      : response.INTERNAL_SERVER_ERROR_500;

    const message = isValidationError ? error.message : "Registration failed";

    return response
      .isError()
      .entity(entities.USER)
      .code(code)
      .message(message)
      .send();
  }
}
