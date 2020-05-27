import CreateDialogService from "../services/CreateDialogService";
import ConsultDialogService from "../services/ConsultDialogService";

import { IRequest, IResponse } from "../http.d";

class DialogController {
  async store(req: IRequest, res: IResponse) {
    const response = await CreateDialogService(req, res);
    return response;
  }

  async index(req: IRequest, res: IResponse) {
    const response = await ConsultDialogService(req, res);
    return response;
  }
}

export default new DialogController();
