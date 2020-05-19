const supertest = require("supertest");
const faker = require("faker");
const app = require("../../../src/app");

const request = supertest(app);

const name = faker.name.findName();
const email = faker.internet.email().toLowerCase();
const password = faker.internet.password();

describe("Authentication User", () => {
  beforeAll(async () => {
    await request.post("/v1/register").send({
      name,
      email,
      password,
    });
  });

  it("Check user authentication with all fields correctly filled.", async () => {
    const response = await request.post("/v1/authenticate").send({
      email,
      password,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBeUndefined();
    expect(response.body.data.user.name).toBe(name);
    expect(response.body.data.user.email).toBe(email);
    expect(response.body.metadata.token).toBeTruthy();
  });

  it("Check user authentication with invalid email", async () => {
    const response = await request.post("/v1/authenticate").send({
      email: faker.internet.email(),
      password,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });

  it("Check user authentication without sending the email field", async () => {
    const response = await request.post("/v1/authenticate").send({ password });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User not found");
  });

  it("Check user authentication with invalid password", async () => {
    const response = await request.post("/v1/authenticate").send({
      email,
      password: faker.internet.password(),
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Invalid Password");
  });

  it("Check user authentication without sending the password field", async () => {
    const response = await request.post("/v1/authenticate").send({
      email,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Invalid Password");
  });
});
