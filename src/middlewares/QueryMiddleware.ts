import { Request, Response, NextFunction } from "express";

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { speech, answer } = req.query;
  if (speech) {
    req.query.speech = speech.toString().toLowerCase();
  }
  if (answer) {
    req.query.answer = answer.toString().toLowerCase();
  }
  next();
}
