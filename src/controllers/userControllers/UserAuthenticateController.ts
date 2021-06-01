import { Request, Response } from "express";
import { Auth } from "../../@types/Auth";
import UserAuthenticateService from "../../services/userServices/UserAuthenticateService";

export default class UserAuthenticateController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { authorization } = request.headers as Auth;
    
    const userAuthenticateService = new UserAuthenticateService()
    const token = await userAuthenticateService.execute({ authorization })

    return response.status(200).json(token)
  }
}