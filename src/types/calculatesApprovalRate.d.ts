import { Schema } from "mongoose";

export interface ICalculatesApprovalRate {
  approvals: Schema.Types.ObjectId[];
  disapprovals: Schema.Types.ObjectId[];
}
