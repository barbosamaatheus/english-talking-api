import { Request, Response } from "express";

import Auth from "../../@types/appTypes/Auth";
import AuthenticateUserService from "../../services/userServices/AuthenticateUserService";

export default class AuthenticateUserController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { authorization } = request.headers as Auth;
    
    const authenticateUserService = new AuthenticateUserService();
    const token = await authenticateUserService.execute({ authorization });

    return response.status(200).json(token);
  }
}