import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";


describe("Authentication POST /dialog", () => {
  const request = supertest(app);
  
  let authorization: string;

  const dialog = {
    speech: faker.lorem.sentence(),
    answer: faker.lorem.sentence()
  }
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  }

  beforeAll(async () => {
    await request
      .post("/v1/user/register")
      .send(user);
    
    const response = await request
      .get("/v1/user/login")
      .auth(user.email, user.password);
  
    authorization = `Bearer ${response.body.token}`;
  });

  it("No token provider", async () => {
    const response = await request
      .post("/v1/dialog")
      .send(dialog);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provider");
  });

  it("Token error", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Outher Token Bearer")
      .send(dialog);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token error");
  });

  it("Token malformatted", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Beareer token")
      .send(dialog);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token malformatted");
  });

  it("Token invalid", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Bearer token")
      .send(dialog);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token invalid");
  });
});
