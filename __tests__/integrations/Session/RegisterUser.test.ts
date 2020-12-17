import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";

const request = supertest(app);

describe("Register User", () => {
  it("Check user registration with all fields correctly filled.", async () => {
    const name = faker.name.findName();
    const picture = faker.image.imageUrl();
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    const response = await request.post("/v1/register").send({
      name,
      picture,
      email,
      password,
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe(name);
    expect(response.body.data.picture).toBe(picture);
    expect(response.body.data.email).toBe(email);
    expect(response.body.metadata.token).toBeTruthy();
  });

  it("Check user registration already registered", async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const picture = faker.image.imageUrl();

    await request.post("/v1/register").send({
      name,
      email,
      password,
      picture,
    });

    const response = await request.post("/v1/register").send({
      name,
      email,
      password,
      picture,
    });
    expect(response.status).toBe(409);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("User already exists");
  });

  it("Check user registration with invalid email", async () => {
    const name = faker.name.findName();
    const email = "invalidEmail";
    const password = faker.internet.password();
    const picture = faker.image.imageUrl();

    const response = await request.post("/v1/register").send({
      name,
      email,
      password,
      picture,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(
      "An instance of User has failed the validation:\n - property email has failed the following constraints: isEmail \n"
    );
  });

  it("Check user registration without sending the email field", async () => {
    const name = faker.name.findName();
    const password = faker.internet.password();
    const picture = faker.image.imageUrl();

    const response = await request.post("/v1/register").send({
      name,
      picture,
      password,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(
      "An instance of User has failed the validation:\n - property email has failed the following constraints: isEmail \n"
    );
  });
  it("Check user registration without sending the name field", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const picture = faker.image.imageUrl();

    const response = await request.post("/v1/register").send({
      email,
      password,
      picture,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(
      "An instance of User has failed the validation:\n - property name has failed the following constraints: minLength, maxLength \n"
    );
  });
  it("Check user registration without sending the password field", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const picture = faker.image.imageUrl();

    const response = await request.post("/v1/register").send({
      name,
      email,
      picture,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(
      "An instance of User has failed the validation:\n - property password has failed the following constraints: minLength \n"
    );
  });
});
