import AppError from "./AppError";

class UnauthorizedError extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError