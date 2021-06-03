import ApprovalsAndDisapprovals from "../@types/appTypes/ApprovalsAndDisapprovals";

class CalculatesApprovalRate
{
  public async exec({ approvals, disapprovals }: ApprovalsAndDisapprovals): Promise<number>
  {
    const total = Number(approvals) + Number(disapprovals);
    return Math.round((approvals / total) * 100) || 0;
  }
}

export default new CalculatesApprovalRate();