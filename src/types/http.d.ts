import { Request } from "express";
import { Schema } from "mongoose";

export type UserID = Schema.Types.ObjectId;

export interface IRequest extends Request {
  userId?: string | UserID;
}

export { Response as IResponse } from "express";
