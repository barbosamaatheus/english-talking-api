/* eslint-disable dot-notation */
/* eslint-disable no-undef */
const supertest = require("supertest");
const faker = require("faker");
const app = require("../../../src/app");

const request = supertest(app);

let authorization;
const speech = faker.lorem.sentence();
const answer = faker.lorem.sentence();
beforeAll(async () => {
  const response = await request.post("/v1/register").send({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  authorization = `Bearer ${response.body.token}`;
  await request
    .post("/v1/dialog")
    .set("Authorization", authorization)
    .send({ speech, answer });

  await request
    .post("/v1/dialog")
    .set("Authorization", authorization)
    .send({ speech: faker.lorem.sentence(), answer: faker.lorem.sentence() });
});
describe("Dialog consultation", () => {
  it("Check the limit with a valid value", async () => {
    const limit = 1;
    const response = await request.get("/v1/dialog").set("limit", limit);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  it("Check a threshold that receives an invalid value", async () => {
    const response = await request
      .get("/v1/dialog")
      .set("limit", "invalidLimit");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("Check the page with a valid value", async () => {
    const page1 = await request
      .get("/v1/dialog")
      .set("limit", 1)
      .set("page", 1);

    const page2 = await request
      .get("/v1/dialog")
      .set("limit", 1)
      .set("page", 2);

    expect(page1.statusCode).toBe(200);
    expect(page2.statusCode).toBe(200);
    // eslint-disable-next-line dot-notation
    expect(page1.body[0]["_id"]).not.toBe(page2.body[0]["_id"]);
  });

  it("Check that the count was correct", async () => {
    const response = await request.get("/v1/dialog");

    expect(response.statusCode).toBe(200);
    expect(response.header["x-total-count"]).toBe("2");
  });
  it("Check all fields of the dialog", async () => {
    const responseStatus = await request.get("/v1/dialog").query({
      status: "analyzing",
    });
    const responseSpeech = await request.get("/v1/dialog").query({ speech });
    const responseAnswer = await request.get("/v1/dialog").query({ answer });

    expect(responseStatus.body[0].status).toBe("analyzing");
    expect(responseSpeech.body[0].speech).toBe(speech);
    expect(responseAnswer.body[0].answer).toBe(answer);
  });
});
