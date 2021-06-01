import AppError from "./AppError";

class BadRequestError extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError