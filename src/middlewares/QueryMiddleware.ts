import { NextFunction as INextFunction } from "express";

import { IRequest, IResponse } from "../@types/http";

export default async function AuthMiddleware(
  req: IRequest,
  res: IResponse,
  next: INextFunction
) {
  const { speech, answer } = req.query;
  if (speech) {
    req.query.speech = speech.toString().toLowerCase().trim();
  }
  if (answer) {
    req.query.answer = answer.toString().toLowerCase().trim();
  }
  next();
}
