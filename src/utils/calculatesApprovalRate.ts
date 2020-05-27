import { Schema } from "mongoose";

interface ICalculatesApprovalRate {
  approvals: Schema.Types.ObjectId[];
  disapprovals: Schema.Types.ObjectId[];
}

export default function calculatesApprovalRate({
  approvals,
  disapprovals,
}: ICalculatesApprovalRate) {
  const total = approvals.length + disapprovals.length;

  return Math.round((approvals.length / total) * 100) || 0;
}
