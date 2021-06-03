import AppError from "./AppError";

class ConflictError extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError