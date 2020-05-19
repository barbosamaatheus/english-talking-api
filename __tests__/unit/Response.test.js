const Response = require("../../src/utils/responses");

const FakeRes = class {
  constructor() {
    this.status = () => this;
    this.json = (response) => response;
  }
};

it("Check Response Class sending 'entity' field after 'code' field", () => {
  const res = new FakeRes();

  const response = new Response(res);

  const test = () => response.code(response.CONFLICT_REQUEST);

  expect(test).toThrow("You must set the entity value before to set the code");
});

it("Check Response Class without sending the 'code' field", () => {
  const res = new FakeRes();

  const response = new Response(res);

  const { entities } = response;

  const test = () => response.entity(entities.USER).send();

  expect(test).toThrow(
    "This request dont have a defined error code, set this with: response.code(response.SUCCESS_POST); for example"
  );
});

it("Check Response Class without sending the 'entity' field", () => {
  const res = new FakeRes();

  const response = new Response(res);

  const test = () => response.message("I am a test").send();

  expect(test).toThrow(
    "This request dont have a entity, set this with: response.entity(response.entities.CHOOSE_A_ENTITY);"
  );
});

it("Check Response Class with successfully correctly usage", () => {
  const res = new FakeRes();

  const response = new Response(res);

  const { entities } = response;

  const dataRequest = {
    user: {
      name: "Foo bar",
      email: "foobar@gmail.com",
    },
  };
  const metadataRequest = {
    token: "Imagine a random token jwt here, thank you",
  };

  const objectResponse = response
    .entity(entities.USER)
    .code(response.SUCCESS_POST)
    .message("Successful post")
    .data(dataRequest)
    .metadata(metadataRequest)
    .send();

  expect(objectResponse.data).toBe(dataRequest);
  expect(objectResponse.metadata).toBe(metadataRequest);
  expect(objectResponse.status).toBe(201);
  expect(objectResponse.message).toBe("Successful post");
  expect(objectResponse.code).toBe("success-created/user");
  expect(objectResponse.entity).toBe("user");
});
