import supertest from "supertest";
import faker from "faker";

import app from "../../../src/app";

describe("Authentication User", () => {
  const request = supertest(app);
  
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl()
  };
  const basicAuthHash = "b3N3YWxkX2NyaXN0QHlhaG9vLmNvbTp1dGRJNUNDVGhlNXFFMDE=";

  beforeAll(async () => {
    await request
    .post("/v1/user/register")
    .send(user);
  });

  it("Check user authentication with all fields correctly filled.", async () => {
    const response = await request
      .get("/v1/user/login")
      .auth(user.email, user.password);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("Check user authentication without Basic auth", async () => {
    const response = await request
      .get("/v1/user/login")
      .set("Authorization", `Bearer ${basicAuthHash}`);
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Necessary Basic Auth");
  })

  it("Check user authentication with invalid email", async () => {
    const invalidEmail = faker.internet.email();
    
    const response = await request
      .get("/v1/user/login")
      .auth(invalidEmail, user.password);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or/and password");
  });

  it("Check user authentication with invalid password", async () => {
    const invalidPassword = faker.internet.password();

    const response = await request
      .get("/v1/user/login")
      .auth(user.email, invalidPassword);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or/and password");
  });

  it("Check user authentication without sending the password field", async () => {
    const emptyPassword = "";

    const response = await request
      .get("/v1/user/login")
      .auth(user.email, emptyPassword);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or/and password");
  });

  it("Check user authentication without sending the email field", async () => {
    const emptyEmail = "";

    const response = await request
      .get("/v1/user/login")
      .auth(emptyEmail, user.password);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or/and password");
  });
});
