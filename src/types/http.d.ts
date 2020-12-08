import { Request } from "express";

export type UserID = uuid;

export interface IRequest extends Request {
  userId?: uuid;
}

export { Response as IResponse } from "express";
