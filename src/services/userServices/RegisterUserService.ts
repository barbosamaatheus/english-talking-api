import { validate } from "class-validator";
import { getRepository, Repository } from "typeorm";

import User from "../../models/User";
import UserRegister from "../../@types/appTypes/UserRegister";
import ConflictError from "../../errors/errorsTypes/ConflictError";
import BadRequestError from "../../errors/errorsTypes/BadRequestError";

export default class RegisterUserService
{
  private repository: Repository<User> 
  
  constructor()
  {
    this.repository = getRepository(User)
  }

  public async execute({ name, picture, email, password }: UserRegister): Promise<void>
  {
    const userAlreadyExists = await this.repository.findOne({ email });
    if(userAlreadyExists) throw new ConflictError("User already exists");

    const user = this.repository.create({ name, picture, email, password });

    const errors = await validate(user);
    if(errors.length) throw new BadRequestError(`Invalid ${errors[0].property}`);

    await this.repository.save(user);
  }
}
