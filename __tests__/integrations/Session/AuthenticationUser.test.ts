import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";

const request = supertest(app);

const name = faker.name.findName();
const email = faker.internet.email().toLowerCase();
const password = faker.internet.password();
const picture = faker.image.imageUrl();

describe("Authentication User", () => {
  beforeAll(async () => {
    await request.post("/v1/register").send({
      name,
      email,
      password,
      picture,
    });
  });

  it("Check user authentication with all fields correctly filled.", async () => {
    const response = await request
      .get("/v1/authenticate")
      .auth(email, password);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();
    expect(response.body.data.name).toBe(name);
    expect(response.body.data.email).toBe(email);
    expect(response.body.metadata.token).toBeTruthy();
  });

  it("Check user authentication with invalid email", async () => {
    const invalidEmail = faker.internet.email();
    const response = await request
      .get("/v1/authenticate")
      .auth(invalidEmail, password);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("User not found");
  });

  it("Check user authentication with invalid password", async () => {
    const invalidPassword = faker.internet.password();
    const response = await request
      .get("/v1/authenticate")
      .auth(email, invalidPassword);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Invalid Password");
  });

  it("Check user authentication without sending the password field", async () => {
    const emptyPassword = "";
    const response = await request
      .get("/v1/authenticate")
      .auth(email, emptyPassword);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Invalid Password");
  });

  it("Check user authentication without sending the email field", async () => {
    const emptyEmail = "";
    const response = await request
      .get("/v1/authenticate")
      .auth(emptyEmail, password);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("User not found");
  });
});
