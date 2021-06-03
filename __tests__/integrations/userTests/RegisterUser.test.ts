import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";


describe("Register User", () => {
  const request = supertest(app);

  const user = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl()
  }
  const userWithoutEmail = {
    name: faker.name.findName(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl()
  }
  const userWithoutName = {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl()
  }
  const userWithoutPassword = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    picture: faker.image.imageUrl()
  }
  
  it("Check user registration with all fields correctly filled.", async () => {
    const createdResponse = await request
      .post("/v1/user/register")
      .send(user);

    const loginResponse = await request
      .get("/v1/user/login")
      .auth(user.email, user.password)

    expect(createdResponse.status).toBe(201);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeTruthy();
  });

  it("Check user registration already registered", async () => {
    const response = await request
      .post("/v1/user/register")
      .send(user);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  it("Check user registration with invalid email", async () => {
    const invalidEmail = "invalidEmail";

    const response = await request
    .post("/v1/user/register")
    .send({ ...userWithoutEmail, emai: invalidEmail });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("Check user registration without sending the email field", async () => {
    const response = await request
      .post("/v1/user/register")
      .send(userWithoutEmail);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  it("Check user registration without sending the name field", async () => {
    const response = await request
      .post("/v1/user/register")
      .send(userWithoutName);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid name");
  });

  it("Check user registration without sending the password field", async () => {
    const response = await request
      .post("/v1/user/register")
      .send(userWithoutPassword);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid password");
  });
});
