import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import UserView from "../views/UserView";
import User from "../models/User";

import { IRequest, IResponse } from "../@types/http";

export default async function RegisterUserService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const jwt = new JwtManager();
  const userRepository = getRepository(User);
  const response = new ResponseHandler(res);
  const { entities } = response;

  try {
    const { name, picture, email, password } = req.body;

    if (await userRepository.findOne({ email }))
      return response
        .isError()
        .entity(entities.USER)
        .code(response.CONFLICT_409)
        .message("User already exists")
        .send();

    const data = {
      name,
      picture,
      email,
      password,
    };

    const user = userRepository.create(data);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error(`${[errors[0]]}`);
    } else {
      await userRepository.save(user);
    }

    return response
      .entity(entities.USER)
      .code(response.CREATED_201)
      .data(UserView.render(user))
      .metadata({
        token: jwt.generate({ id: user.id }),
      })
      .send();
  } catch (error: any) {
    const isValidationError =
      error.name === "QueryFailedError" || error.name === "Error";

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
