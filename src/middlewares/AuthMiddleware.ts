import "../config/env";
import { Request, Response, NextFunction } from "express";

import JwtManager from "../utils/JwtManager";
import UnauthorizedError from "../errors/errorsTypes/UnauthorizedError";

class AuthMiddleware
{
  public async exec(request: Request, response: Response, next: NextFunction): Promise<void>
  {
    const { authorization } = request.headers;

    if(!authorization) throw new UnauthorizedError("No token provider");

    const tokenComponents = authorization.split(" ");

    if(tokenComponents.length !== 2)
      throw new UnauthorizedError("Token error");
      
    const [ schema, token ] = tokenComponents;
    
    if(!/^Bearer$/i.test(schema))
      throw new UnauthorizedError("Token malformatted");

    const jwt = new JwtManager();
    const decoded = await jwt.verify(token);

    request.userId = decoded.id;
    return next();
  }
}

export default new AuthMiddleware();