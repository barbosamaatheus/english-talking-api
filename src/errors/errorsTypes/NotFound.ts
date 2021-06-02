import AppError from "./AppError";

class NotFound extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 404);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export default NotFound