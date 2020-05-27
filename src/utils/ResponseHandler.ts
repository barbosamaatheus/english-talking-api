import { Response as HTTPResponse } from "express";
import { FakeResponseHandler } from "../../__tests__/mocks/FakeResponseHandler";

interface Entity {
  message: string;
  value: undefined | string;
}

interface Code {
  message: string;
  value: undefined | string;
}

interface Entities {
  [key: string]: string;
}

interface Required {
  [key: string]: any;
  entity: Entity;
  code: Code;
}

interface IResponse {
  entity?: string;
  code?: string;
  status?: number;
  error?: boolean;
  message?: string;
  data?: any;
  metadata?: any;
}

export class ResponseHandler {
  entities!: Entities;
  required!: Required;
  response!: IResponse;
  res!: HTTPResponse<IResponse> | FakeResponseHandler;
  status!: number;

  constructor(res: HTTPResponse | FakeResponseHandler) {
    // All available API entities
    this.entities = {
      USER: "user",
      DIALOG: "dialog",
    };

    // Required properties
    this.required = {
      entity: {
        message:
          "This request dont have a entity, set this with: response.entity(response.entities.CHOOSE_A_ENTITY);",
        value: undefined,
      },
      code: {
        message:
          "This request dont have a defined error code, set this with: response.code(response.CREATED_201); for example",
        value: undefined,
      },
    };

    // Response Object
    this.response = {};

    // Request Object
    this.res = res;
  }

  normalizeResponse() {
    this.response.entity = this.required.entity.value;
    this.response.code = this.required.code.value;
    this.response.status = this.status;
  }

  checkIfAllIsOk() {
    Object.keys(this.required).forEach((key) => {
      const requiredField = this.required[key];

      if (requiredField.value === undefined)
        throw new Error(requiredField.message);
    });
  }

  // Call this method if the response is a error
  isError() {
    this.response.error = true;
    return this;
  }

  // Call this method to set a current entity that response
  entity(entity: string) {
    this.required.entity.value = entity;
    return this;
  }

  code(code: string) {
    if (this.required.entity.value === undefined)
      throw new Error("You must set the entity value before to set the code");

    this.required.code.value = code;
    return this;
  }

  message(message: string) {
    this.response.message = message;
    return this;
  }

  data(data: any) {
    this.response.data = data;
    return this;
  }

  metadata(metadata: any) {
    this.response.metadata = metadata;
    return this;
  }

  send() {
    this.checkIfAllIsOk();

    this.normalizeResponse();

    return this.res.status(this.status).json(this.response);
  }

  // When the action required is a post request and request is successful
  get CREATED_201() {
    this.status = 201;
    return `success-created/${this.required.entity.value}`;
  }

  // When the action required is a get request and request is successful
  get OK_200() {
    this.status = 200;
    return `success-get/${this.required.entity.value}`;
  }

  // When the action required is a delete request and request is successful
  get NO_CONTENT_204() {
    this.status = 204;
    return `success-deleted/${this.response.entity}`;
  }

  // When the client dont have permission to do X action
  get UNAUTHORIZED_401() {
    this.status = 401;
    return `invalid-auth/${this.response.entity}`;
  }

  // When the resource not exists on database or any system place
  get NOT_FOUND_404() {
    this.status = 404;
    return `not-found/${this.response.entity}`;
  }

  // When the client send a bad request: invalid password, invalid email, or send a invalid field
  // Or the current resource already exists, etc
  get BAD_REQUEST_400() {
    this.status = 400;
    return `invalid-request/${this.response.entity}`;
  }

  // When the user request dont can be continued by conflicts with other resources
  get CONFLICT_409() {
    this.status = 409;
    return `conflict-request/${this.response.entity}`;
  }

  // A internal server error
  get INTERNAL_SERVER_ERROR_500() {
    this.status = 500;
    return `internal-server-error/${this.response.entity}`;
  }
}
