import { compare } from "bcrypt";
import { getRepository, Repository } from "typeorm";

import { Auth } from "../../@types/Auth";
import { Token } from "../../@types/Token";
import BadRequestError from "../../errors/errorsTypes/BadRequestError";
import UnauthorizedError from "../../errors/errorsTypes/UnauthorizedError";
import User from "../../models/User";
import { JwtManager } from "../../utils/JwtManager";

export default class UserAuthenticateService
{
  private repository: Repository<User>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async execute({ authorization }: Auth): Promise<Token>
  {
    const [hashType, hash] = authorization.split(" ");
    if(hashType !== "Basic")
      throw new BadRequestError("Necessary Basic Auth");
    
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");

    const userExists = await this.repository.findOne({ email });
    const passwordCorrect = await compare(password, userExists?.password ?? password);

    if(!userExists || !passwordCorrect)
      throw new UnauthorizedError("Invalid email or/and password");

    const jwt = new JwtManager();
    return { token: jwt.generate({ id: userExists.id }) };
  }
}