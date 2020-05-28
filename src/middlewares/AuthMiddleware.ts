/* eslint-disable consistent-return */
import "../config/env";
import { NextFunction as INextFunction } from "express";

import { JwtManager } from "../utils/JwtManager";
import { ResponseHandler } from "../utils/ResponseHandler";

import { IRequest, IResponse } from "../types/http";

export default async function AuthMiddleware(
  req: IRequest,
  res: IResponse,
  next: INextFunction
) {
  const jwt = new JwtManager();

  const response = new ResponseHandler(res);
  const { entities } = response;

  const badRequest = response
    .isError()
    .entity(entities.USER)
    .code(response.UNAUTHORIZED_401);

  const authHeader = req.headers.authorization;

  if (!authHeader) return badRequest.message("No token provider").send();

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return badRequest.message("Token error").send();

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return badRequest.message("Token malformatted").send();

  try {
    const decoded = await jwt.verify(token);

    req.userId = decoded?.id;

    return next();
  } catch (error) {
    badRequest.message("Token invalid").send();
  }
}
