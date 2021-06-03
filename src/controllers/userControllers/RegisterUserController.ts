import { Request, Response } from "express";

import RegisterUserService from "../../services/userServices/RegisterUserService";

export default class RegisterUserController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { name, picture, email, password } = request.body;
   
    const registerUserService = new RegisterUserService();
    await registerUserService.execute({ name, picture, email, password });

    return response.status(201).end();
  }
}