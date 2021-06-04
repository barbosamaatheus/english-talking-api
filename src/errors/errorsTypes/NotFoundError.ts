import AppError from "./AppError";

class NotFoundError extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  };
};

export default NotFoundError