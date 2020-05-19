module.exports = class Response {
  constructor(res) {
    // All available API entities
    this.entities = {
      USER: "user",
      DIALOG: "dialog",
      SERVICE: "service",
    };
    this.res = res;
  }

  isError() {
    this.response.error = true;
    return this;
  }

  entity(entity) {
    this.response.entity = entity;
    return this;
  }

  code(code) {
    this.response.code = code;
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
    return this.res.status(this.status).json(this.response);
  }

  // When the action required is a post request and request is successful
  get SUCCESS_POST() {
    this.status = 200;
    return `success-created/${this.response.entity}`;
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
