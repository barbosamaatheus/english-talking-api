import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import User from "../models/User";

import { IRequest, IResponse } from "../@types/http";
import UserView from "../views/UserView";

export default async function AuthenticationUserService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const userRepository = getRepository(User);

  const jwt = new JwtManager();
  const response = new ResponseHandler(res);

  const { entities } = response;

  const authorization = req.headers.authorization as String;
  const [hashType, hash] = authorization.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  const user = await userRepository.findOne({ email });

  if (!user)
    return response
      .isError()
      .entity(entities.USER)
      .code(response.NOT_FOUND_404)
      .message("User not found")
      .send();

  if (!password || !(await bcrypt.compare(password, user.password as string)))
    return response
      .isError()
      .entity(entities.USER)
      .code(response.BAD_REQUEST_400)
      .message("Invalid Password")
      .send();

  return response
    .entity(entities.USER)
    .code(response.OK_200)
    .data(UserView.render(user))
    .metadata({ token: jwt.generate({ id: user.id }) })
    .send();
}
