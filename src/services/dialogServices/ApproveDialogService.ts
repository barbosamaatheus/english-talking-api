import { getRepository, Repository } from "typeorm";

import Dialog from "../../models/Dialog";
import Status from "../../utils/enumStatus";
import DialogAndUser from "../../@types/appTypes/DialogAndUser";
import ConflictError from "../../errors/errorsTypes/ConflictError";
import NotFoundError from "../../errors/errorsTypes/NotFoundError";
import calculatesApprovalRate from "../../utils/calculatesApprovalRate";

export default class ApproveDialogService
{
  private repository: Repository<Dialog>

  constructor()
  {
    this.repository = getRepository(Dialog)
  }

  public async execute({ dialogId, userId }: DialogAndUser): Promise<void>
  {
    const dialogue = await this.repository.findOne(dialogId);
    if(!dialogue) throw new NotFoundError("Resource not found");

    const [{ userAlreadyApprovals }] = await this.repository.query(`
      SELECT COUNT(users.id) as "userAlreadyApprovals"
      FROM approvals
      LEFT JOIN users
      ON approvals."usersId" = $1
      LIMIT 1
    `, [userId]);
    
    if(userAlreadyApprovals > 0)
      throw new ConflictError("User has already approved this dialog");
    
    await this.repository
      .createQueryBuilder()
      .relation(Dialog, "disapprovals")
      .of(dialogue)
      .remove(userId);

    await this.repository
      .createQueryBuilder()
      .relation(Dialog, "approvals")
      .of(dialogue)
      .add(userId);

    const average = await calculatesApprovalRate.exec(dialogId);
    const minimunAverageForApproved = 70;

    if(average >= minimunAverageForApproved)
      dialogue.status = Status.APPROVED;

    await this.repository.save(dialogue)
  }
}