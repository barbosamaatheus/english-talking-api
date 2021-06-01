import { validate } from "class-validator";
import { getRepository, Repository } from "typeorm";
import { Token } from "../../@types/Token";
import { UserRegisterDTO } from "../../@types/UserRegisterDTO";
import BadRequestError from "../../errors/errorsTypes/BadRequestError";
import ConflictError from "../../errors/errorsTypes/ConflictError";
import InternalServerError from "../../errors/errorsTypes/InternalServerError";
import User from "../../models/User";
import { JwtManager } from "../../utils/JwtManager";

export default class UserRegisterService
{
  private repository: Repository<User> 
  
  constructor()
  {
    this.repository = getRepository(User)
  }

  public async execute({ name, picture, email, password }: UserRegisterDTO): Promise<Token>
  {
    const userAlreadyExists = await this.repository.findOne({ email });
    if(userAlreadyExists) throw new ConflictError("User already exists");

    const user = this.repository.create({ name, picture, email, password });

    const errors = await validate(user);
    if(errors.length) throw new BadRequestError(`Invalid ${errors[0].property}`);

    await this.repository.save(user);
    
    const jwt = new JwtManager();
    return { token: jwt.generate({ id: user.id }) };
  }
}
