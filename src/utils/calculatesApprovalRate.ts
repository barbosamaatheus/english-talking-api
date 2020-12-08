import { ICalculatesApprovalRate } from "../types/calculatesApprovalRate";

export default function calculatesApprovalRate({
  approvals = [],
  disapprovals = [],
}: ICalculatesApprovalRate) {
  const total = approvals.length + disapprovals.length;

  return Math.round((approvals.length / total) * 100) || 0;
}
