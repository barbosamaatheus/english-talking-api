const supertest = require("supertest");
const faker = require("faker");
const app = require("../../src/app");

const request = supertest(app);

describe("Create Dialog", () => {
  let authorization;
  beforeAll(async () => {
    const response = await request.post("/v1/register").send({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    authorization = `Bearer ${response.body.token}`;
  });

  it("Check dialogue creation with all fields correctly filled.", async () => {
    const speech = faker.lorem.sentence();
    const answer = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ speech, answer });

    expect(response.statusCode).toBe(201);
    expect(response.body.speech).toMatch(speech);
    expect(response.body.answer).toMatch(answer);
    expect(response.body.status).toMatch("analyzing");
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
