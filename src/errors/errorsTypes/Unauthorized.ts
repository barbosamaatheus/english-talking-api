import AppError from "./AppError";

class Unauthorized extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 401);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

export default Unauthorized