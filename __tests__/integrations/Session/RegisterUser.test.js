const supertest = require("supertest");
const faker = require("faker");
const app = require("../../../src/app");

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

    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.name).toBe(name);
    expect(response.body.data.user.picture).toBe(picture);
    expect(response.body.data.user.email).toBe(email);
    expect(response.body.metadata.token).toBeTruthy();
  });

  it("Check user registration already registered", async () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await request.post("/v1/register").send({
      name,
      email,
      password,
    });

    const response = await request.post("/v1/register").send({
      name,
      email,
      password,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("User already exists");
  });

  it("Check user registration with invalid email", async () => {
    const name = faker.name.findName();
    const email = "invalidEmail";
    const password = faker.internet.password();

    const response = await request.post("/v1/register").send({
      name,
      email,
      password,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "User validation failed: email: email adreess is not a valid!"
    );
  });

  it("Check user registration without sending the email field", async () => {
    const name = faker.name.findName();
    const password = faker.internet.password();

    const response = await request.post("/v1/register").send({
      name,
      password,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "User validation failed: email: Path `email` is required."
    );
  });
  it("Check user registration without sending the name field", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const response = await request.post("/v1/register").send({
      email,
      password,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "User validation failed: name: Path `name` is required."
    );
  });
  it("Check user registration without sending the password field", async () => {
    const name = faker.name.firstName();
    const email = faker.internet.email();

    const response = await request.post("/v1/register").send({
      name,
      email,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(
      "User validation failed: password: Path `password` is required."
    );
  });
});
