import { UserType } from "../models/User";
import { DialogType } from "../models/Dialog";

export interface IEntity {
  message: string;
  value: undefined | string;
}

export interface ICode {
  message: string;
  value: undefined | string;
}

export interface IEntities {
  [key: string]: string;
}

export interface IRequired {
  [key: string]: any;
  entity: IEntity;
  code: ICode;
}

export type Data =
  | DialogType
  | DialogType[]
  | {
      user?: UserType;
    };

export interface IMetadata {
  token?: string;
}

export interface IResponse {
  entity?: string;
  code?: string;
  status?: number;
  error?: boolean;
  message?: string;
  data?: Data;
  metadata?: IMetadata;
}
