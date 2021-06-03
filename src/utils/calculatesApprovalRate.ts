import { getConnection } from "typeorm";

class CalculatesApprovalRate
{
  public async exec(dialogId: string): Promise<number>
  {
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
    
    const total = Number(approvals) + Number(disapprovals);
    return Math.round((approvals / total) * 100) || 0;
  }
}

export default new CalculatesApprovalRate();