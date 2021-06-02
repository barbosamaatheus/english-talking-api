import AppError from "./AppError";

class BadRequest extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export default BadRequest