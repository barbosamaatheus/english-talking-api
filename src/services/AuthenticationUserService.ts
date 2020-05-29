import bcrypt from "bcrypt";

import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";
import User from "../models/User";

import { IRequest, IResponse } from "../types/http";

export default async function AuthenticationUserService(
  req: IRequest,
  res: IResponse
): Promise<ResponseHandler> {
  const jwt = new JwtManager();
  const response = new ResponseHandler(res);
  const { entities } = response;
  const [hashType, hash] = req.headers.authorization?.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  const user = await User.findOne({ email}).select("+password");

  console.log(user);

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
