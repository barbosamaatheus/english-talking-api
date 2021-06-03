import { getRepository, Repository } from "typeorm";

import Dialog from "../../models/Dialog";
import Status from "../../utils/EnumStatus";
import CreateDialog from "../../@types/appTypes/CreateDialog";
import BadRequestError from "../../errors/errorsTypes/BadRequestError";

export default class CreateDialogService
{
  private repository: Repository<Dialog>

  constructor()
  {
    this.repository = getRepository(Dialog)
  }

  public async execute({ speech, answer }: CreateDialog, userId: string): Promise<void>
  {
    if(!speech || !answer)
      throw new BadRequestError("Speech or Answer not sent");

    const dialog = this.repository.create({
      speech: speech.toString().toLowerCase(),
      answer: answer.toString().toLowerCase(),
      status: Status.ANALYZING,
      owner: userId
    })

    await this.repository.save(dialog)
  }
}