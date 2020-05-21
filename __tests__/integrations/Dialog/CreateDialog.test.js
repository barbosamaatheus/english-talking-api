const supertest = require("supertest");
const faker = require("faker");
const app = require("../../../src/app");

const request = supertest(app);

let authorization;
beforeAll(async () => {
  const response = await request.post("/v1/register").send({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  authorization = `Bearer ${response.body.metadata.token}`;
});

describe("Authentication POST /dialog", () => {
  const speech = faker.lorem.sentence();
  const answer = faker.lorem.sentence();

  it("No token provider", async () => {
    const response = await request.post("/v1/dialog").send({ speech, answer });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("No token provider");
  });

  it("Token error", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Outher Token Bearer")
      .send({ speech, answer });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token error");
  });

  it("Token malformatted", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Beareer token")
      .send({ speech, answer });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token malformatted");
  });

  it("Token invalid", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", "Bearer token")
      .send({ speech, answer });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Token invalid");
  });
});

describe("Create Dialog", () => {
  it("Check dialogue creation with all fields correctly filled.", async () => {
    const speech = faker.lorem.sentence();
    const answer = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ speech, answer });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.speech).toBe(speech);
    expect(response.body.data.answer).toBe(answer);
    expect(response.body.data.status).toBe("analyzing");
  });

  it("Check dialogue creation without sending the field speech.", async () => {
    const speech = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ speech });

    expect(response.statusCode).toBe(400);
  });

  it("Check dialogue creation without sending answer field.", async () => {
    const answer = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ answer });

    expect(response.statusCode).toBe(400);
  });
});
