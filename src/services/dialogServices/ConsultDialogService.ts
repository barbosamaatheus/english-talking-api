import { getRepository, Repository } from "typeorm";

import Dialog from "../../models/Dialog";
import ConsultDialog from "../../@types/appTypes/ConsultDialog";
import NotFoundError from "../../errors/errorsTypes/NotFoundError";
import DialoguesAndCount from "../../@types/appTypes/DialoguesAndCount";

export default class ConsultDialogService
{
  private repository: Repository<Dialog>

  constructor()
  {
    this.repository = getRepository(Dialog)    
  }

  public async execute({ limit, page, where }: ConsultDialog): Promise<DialoguesAndCount>
  {
    const [ dialogues, count ] = await this.repository.findAndCount({
      where,
      relations: [
        "owner",
        "approvals",
        "disapprovals"
      ],
      take: limit,
      skip: (page - 1) * limit
    });

    if(!count) throw new NotFoundError("Resource not found");
    
    return { dialogues, count };
  }
}