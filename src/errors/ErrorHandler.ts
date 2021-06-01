import { Request, Response, NextFunction } from "express";
import AppError from "./errorsTypes/AppError";

class ErrorHandler
{
  public exec(err: Error, req: Request, res: Response, next: NextFunction): Response
  {
    const error = { message: err.message }

    if(err instanceof AppError)
      return res.status(err.statusCode).json(error);

    return res.status(500).json(error);
  }
}

export default new ErrorHandler();