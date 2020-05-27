import { UserType } from "../models/User";
import { DialogType } from "../models/Dialog";

export interface Entity {
  message: string;
  value: undefined | string;
}

export interface Code {
  message: string;
  value: undefined | string;
}

export interface Entities {
  [key: string]: string;
}

export interface Required {
  [key: string]: any;
  entity: Entity;
  code: Code;
}

export type Data =
  | DialogType
  | DialogType[]
  | {
      user?: UserType;
    };

export interface Metadata {
  token?: string;
}

export interface IResponse {
  entity?: string;
  code?: string;
  status?: number;
  error?: boolean;
  message?: string;
  data?: Data;
  metadata?: Metadata;
}
