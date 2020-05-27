import bcrypt from "bcrypt";

import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import User from "../models/User";

import { IRequest, IResponse } from "../http.d";

export default async function AuthenticationUserService(
  req: IRequest,
  res: IResponse
) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  const jwt = new JwtManager();

  const response = new ResponseHandler(res);
  const { entities } = response;

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

  user.password = undefined;

  return response
    .entity(entities.USER)
    .code(response.OK_200)
    .data({ user })
    .metadata({ token: jwt.generate({ id: user.id }) })
    .send();
}
