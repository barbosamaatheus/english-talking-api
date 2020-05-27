/* eslint-disable dot-notation */
import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";

const request = supertest(app);

let authorization;
let userId: string;
let dialogId: string;

const speech = faker.lorem.sentence();
const answer = faker.lorem.sentence();

beforeAll(async () => {
  const response = await request.post("/v1/register").send({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  authorization = `Bearer ${response.body.metadata.token}`;
  userId = response.body.data.user["_id"];

  const dialog = await request
    .post("/v1/dialog")
    .set("Authorization", authorization)
    .send({ speech, answer });
  dialogId = dialog.body.data["_id"];

  await request
    .post("/v1/dialog")
    .set("Authorization", authorization)
    .send({ speech: faker.lorem.sentence(), answer: faker.lorem.sentence() });
});

describe("Dialog consultation", () => {
  it("Check the limit with a valid value", async () => {
    const limit = "1";
    const response = await request.get("/v1/dialog").set("limit", limit);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });
  it("Check the limit with an invalid value", async () => {
    const response = await request
      .get("/v1/dialog")
      .set("limit", "invalidLimit");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
  });

  it("Check the page with a valid value", async () => {
    const page1 = await request
      .get("/v1/dialog")
      .set("limit", "1")
      .set("page", "1");

    const page2 = await request
      .get("/v1/dialog")
      .set("limit", "1")
      .set("page", "2");

    expect(page1.status).toBe(200);
    expect(page2.status).toBe(200);
    expect(page1.body.data[0]["_id"]).not.toBe(page2.body.data[0]["_id"]);
  });

  it("Check the page with an invalid value", async () => {
    const page = await request
      .get("/v1/dialog")
      .set("limit", "1")
      .set("page", "invalidPage");

    expect(page.status).toBe(200);
  });

  it("Check that the x-total-count was correct", async () => {
    const response = await request.get("/v1/dialog");

    expect(response.status).toBe(200);
    expect(response.header["x-total-count"]).toBe("2");
  });

  it("Check all queries of the dialog", async () => {
    const responseStatus = await request.get("/v1/dialog").query({
      status: "analyzing",
    });
    const responseUser = await request.get("/v1/dialog").query({
      user: userId,
    });
    const responseId = await request.get("/v1/dialog").query({
      _id: dialogId,
    });
    const responseSpeech = await request.get("/v1/dialog").query({ speech });
    const responseAnswer = await request.get("/v1/dialog").query({ answer });

    expect(responseStatus.body.data[0].status).toBe("analyzing");
    expect(responseUser.body.data[0].user).toBe(userId);
    expect(responseId.body.data[0]["_id"]).toBe(dialogId);
    expect(responseSpeech.body.data[0].speech).toBe(speech);
    expect(responseAnswer.body.data[0].answer).toBe(answer);
  });

  it("Check invalid query", async () => {
    const response = await request.get("/v1/dialog").query({
      invalid: "invalid",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.header["x-total-count"]).toBe("0");
  });

  it("Check return of fields and status", async () => {
    const response = await request.get("/v1/dialog");

    expect(response.status).toBe(200);
    expect(response.body.data[0].user).toBe(userId);
    expect(response.body.data[0]["_id"]).toBe(dialogId);
    expect(response.body.data[0].speech).toBe(speech);
    expect(response.body.data[0].answer).toBe(answer);
    expect(response.body.data[0].approval_rate).toBe(0);
  });
});
