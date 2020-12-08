import { getRepository } from "typeorm";
import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import UserView from "../views/UserView";
import User from "../models/User";

import { IRequest, IResponse } from "../types/http";

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
    await userRepository.save(user);

    return response
      .entity(entities.USER)
      .code(response.CREATED_201)
      .data(UserView.render(user))
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
