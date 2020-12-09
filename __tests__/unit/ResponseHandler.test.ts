import faker from "faker";

import { ResponseHandler } from "../../src/utils/ResponseHandler";
import { MockResponseHandler } from "../mocks/MockResponseHandler";
import User from "../../src/models/User";

const res = new MockResponseHandler();

it("Check Response Class sending 'entity' field after 'code' field", () => {
  const response = new ResponseHandler(res);

  const test = () => response.code(response.CONFLICT_409);

  expect(test).toThrow("You must set the entity value before to set the code");
});

it("Check Response Class without sending the 'code' field", () => {
  const response = new ResponseHandler(res);

  const { entities } = response;

  const test = () => response.entity(entities.USER).send();

  expect(test).toThrow(
    "This request dont have a defined error code, set this with: response.code(response.CREATED_201); for example"
  );
});

it("Check Response Class without sending the 'entity' field", () => {
  const response = new ResponseHandler(res);

  const test = () => response.message(faker.lorem.paragraph()).send();

  expect(test).toThrow(
    "This request dont have a entity, set this with: response.entity(response.entities.CHOOSE_A_ENTITY);"
  );
});

it("Check Response Class with successfully correctly usage", async () => {
  const response = new ResponseHandler(res);

  const { entities } = response;

  const user = new User();

  const dataRequest = {
    user,
  };
  const metadataRequest = {
    token: "Imagine a random token jwt here, thank you",
  };

  const objectResponse = response
    .entity(entities.USER)
    .code(response.CREATED_201)
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
