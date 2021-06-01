class AppError extends Error
{
  constructor(
    readonly message: string,
    readonly statusCode: number
  )
  {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;