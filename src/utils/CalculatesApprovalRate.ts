import ApprovalsAndDisapprovals from "../@types/appTypes/ApprovalsAndDisapprovals";

class CalculatesApprovalRate
{
  public exec({ approvals, disapprovals }: ApprovalsAndDisapprovals): number
  {
    const total = Number(approvals) + Number(disapprovals);
    return Math.round((approvals / total) * 100) || 0;
  }
}

export default new CalculatesApprovalRate();