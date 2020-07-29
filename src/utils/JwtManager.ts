import "../config/env";
import jwt from "jsonwebtoken";

import { IDecoded } from "../types/JwtManager";

export class JwtManager {
  SECRET_KEY: string;

  constructor() {
    this.SECRET_KEY = process.env.SECRET_KEY as string;
  }

  generate(params = {}) {
    return jwt.sign(params, this.SECRET_KEY, { expiresIn: 86400 });
  }

  verify(token: string) {
    return new Promise<IDecoded>((resolve, reject) => {
      jwt.verify(token, this.SECRET_KEY, (error, decoded) => {
        if (error) return reject(error);

        return resolve(decoded as IDecoded);
      });
    });
  }
}
