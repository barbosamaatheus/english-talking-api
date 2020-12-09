import User from "../models/User";

export interface ICalculatesApprovalRate {
  approvals: User[];
  disapprovals: User[];
}
