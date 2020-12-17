import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";

const request = supertest(app);

let authorization: string;

beforeAll(async () => {
  const response = await request.post("/v1/register").send({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  });

  authorization = `Bearer ${response.body.metadata.token}`;
});

describe("Authentication POST /dialog", () => {
  const speech = faker.lorem.sentence();
  const answer = faker.lorem.sentence();

  it("No token provider", async () => {
    const response = await request.post("/v1/dialog").send({ speech, answer });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("No token provider");
  });

  it("Token error", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Outher Token Bearer")
      .send({ speech, answer });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token error");
  });

  it("Token malformatted", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Beareer token")
      .send({ speech, answer });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token malformatted");
  });

  it("Token invalid", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Bearer token")
      .send({ speech, answer });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token invalid");
  });
});
