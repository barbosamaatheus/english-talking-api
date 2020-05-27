import CreateDialogService from "../services/CreateDialogService";
import ConsultDialogService from "../services/ConsultDialogService";

import { IRequest, IResponse } from "../http.d";

export default {
  async index(req: IRequest, res: IResponse) {
    const response = await ConsultDialogService(req, res);
    return response;
  },

  async store(req: IRequest, res: IResponse) {
    const response = await CreateDialogService(req, res);
    return response;
  },
};
