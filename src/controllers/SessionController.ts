import RegisterUserService from "../services/RegisterUserService";
import AuthenticationUserService from "../services/AuthenticationUserService";

import { IRequest, IResponse } from "../types/http";

export default {
  async register(req: IRequest, res: IResponse) {
    const response = await RegisterUserService(req, res);
    return response;
  },

  async authenticate(req: IRequest, res: IResponse) {
    const response = await AuthenticationUserService(req, res);
    return response;
  },
};
