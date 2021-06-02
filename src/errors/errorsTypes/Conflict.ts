import AppError from "./AppError";

class Conflict extends AppError
{
  constructor(readonly message: string)
  {
    super(message, 409);
    Object.setPrototypeOf(this, Conflict.prototype);
  }
}

export default Conflict