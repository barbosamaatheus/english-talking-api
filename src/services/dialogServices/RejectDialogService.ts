import { getConnection, getRepository, Repository } from "typeorm";

import Dialog from "../../models/Dialog";
import Status from "../../utils/EnumStatus";
import DialogAndUser from "../../@types/appTypes/DialogAndUser";
import ConflictError from "../../errors/errorsTypes/ConflictError";
import NotFoundError from "../../errors/errorsTypes/NotFoundError";
import calculatesApprovalRate from "../../utils/CalculatesApprovalRate";

export default class RejectDialogService
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

    const [{ userAlreadyDisapprobals }] = await this.repository.query(`
      SELECT COUNT(users.id) as "userAlreadyDisapprobals"
      FROM disapprovals
      LEFT JOIN users
      ON disapprovals."usersId" = $1
      LIMIT 1
    `, [userId]);
    
    if(userAlreadyDisapprobals > 0)
      throw new ConflictError("User has already disapproved this dialog");
    
    await this.repository
      .createQueryBuilder()
      .relation(Dialog, "approvals")
      .of(dialogue)
      .remove(userId);

    await this.repository
      .createQueryBuilder()
      .relation(Dialog, "disapprovals")
      .of(dialogue)
      .add(userId);

    const [{ approvals }] = await getConnection().query(`
      SELECT COUNT(id) as approvals
      FROM approvals
      WHERE "dialogsId" = $1
      LIMIT 1
    `, [dialogId]);
    
    const [{ disapprovals }] = await getConnection().query(`
      SELECT COUNT(id) as disapprovals
      FROM disapprovals
      WHERE "dialogsId" = $1
      LIMIT 1
    `, [dialogId]);

    const average = calculatesApprovalRate.exec({
      approvals: Number(approvals),
      disapprovals: Number(disapprovals)
    });
    const minimunAverageForApproved = 70;

    if(average <= minimunAverageForApproved)
      dialogue.status = Status.ANALYZING;

    await this.repository.save(dialogue)
  }
}