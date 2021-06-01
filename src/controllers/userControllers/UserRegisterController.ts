import { Request, Response } from "express";
import UserRegisterService from "../../services/userServices/UserRegisterService"

export default class UserRegisterController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { name, picture, email, password } = request.body;
   
    const userRegisterService = new UserRegisterService();

    const token = await userRegisterService
      .execute({ name, picture, email, password });

    return response.status(201).json(token);
  }
}