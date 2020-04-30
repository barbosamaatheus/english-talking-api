const supertest = require("supertest");
const faker = require("faker");
const { app, mongoose } = require("../../src/app");

const request = supertest(app);

describe("Dialog", () => {
  beforeAll(async () => {});
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("Check request with all fields correctly filled.", async () => {
    const speech = faker.lorem.sentence();
    const answer = faker.lorem.sentence();

    const response = await request.post("/dialog").send({ speech, answer });

    expect(response.statusCode).toBe(201);
    expect(response.body.speech).toMatch(speech);
    expect(response.body.answer).toMatch(answer);
    expect(response.body.status).toMatch("analyzing");
  });
  it("Check request without sending the field speech.", async () => {
    const speech = faker.lorem.sentence();

    const response = await request.post("/dialog").send({ speech });

    expect(response.statusCode).toBe(400);
  });
  it("Check request without sending answer field.", async () => {
    const answer = faker.lorem.sentence();

    const response = await request.post("/dialog").send({ answer });

    expect(response.statusCode).toBe(400);
  });
});
