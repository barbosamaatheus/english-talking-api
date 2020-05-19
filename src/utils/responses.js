module.exports = class Response {
  constructor(res) {
    // All available API entities
    this.entities = {
      USER: "user",
      DIALOG: "dialog",
      SERVICE: "service",
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
          "This request dont have a defined error code, set this with: response.code(response.SUCCESS_POST); for example",
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
  entity(entity) {
    this.required.entity.value = entity;
    return this;
  }

  code(code) {
    if (this.required.entity.value === undefined)
      throw new Error("You must set the entity value before to set the code");

    this.required.code.value = code;
    return this;
  }

  message(message) {
    this.response.message = message;
    return this;
  }

  data(data) {
    this.response.data = data;
    return this;
  }

  metadata(metadata) {
    this.response.metadata = metadata;
    return this;
  }

  send() {
    this.checkIfAllIsOk();

    this.normalizeResponse();

    return this.res.status(this.status).json(this.response);
  }

  // When the action required is a post request and request is successful
  get SUCCESS_POST() {
    this.status = 200;
    return `success-created/${this.required.entity.value}`;
  }

  // When the action required is a get request and request is successful
  get SUCCESS_GET() {
    this.status = 200;
    return `success-get/${this.required.entity.value}`;
  }

  // When the action required is a delete request and request is successful
  get SUCCESS_DELETE() {
    this.status = 204;
    return `success-deleted/${this.response.entity}`;
  }

  // When the action required is a put request and request is successful
  get SUCCESS_UPDATE() {
    this.status = 204;
    return `success-updated/${this.response.entity}`;
  }

  // When the client dont have permission to do X action
  get INVALID_AUTH() {
    this.status = 403;
    return `invalid-auth/${this.response.entity}`;
  }

  // When the resource not exists on database or any system place
  get RESOURCE_NOT_FOUND() {
    this.status = 404;
    return `not-found/${this.response.entity}`;
  }

  // When the client send a bad request: invalid password, invalid email, or send a invalid field
  // Or the current resource already exists, etc
  get INVALID_REQUEST() {
    this.status = 400;
    return `invalid-request/${this.response.entity}`;
  }

  // When the user request dont can be continued by conflicts with other resources
  get CONFLICT_REQUEST() {
    this.status = 409;
    return `conflict-request/${this.response.entity}`;
  }

  // A internal server error
  get INTERNAL_ERROR() {
    this.status = 500;
    return `internal-server-error/${this.response.entity}`;
  }

  // A error that not have tratative
  get UNKNOWN_ERROR() {
    this.status = 500;
    return `unkown-error/${this.response.entity}`;
  }
};
