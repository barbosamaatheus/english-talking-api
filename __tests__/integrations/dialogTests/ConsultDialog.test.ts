import supertest from "supertest";
import faker from "faker";

import app from "../../../src/app";
import captalize from "../../../src/utils/captalize";
import JwtManager from "../../../src/utils/JwtManager";


describe("Dialog consultation", () => {
  const request = supertest(app);
  const jwt = new JwtManager();

  let authorization: string;
  let userId: string;
  let dialogId: string;
  
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  };
  const dialog1 ={
    speech: faker.lorem.sentence().toLowerCase(),
    answer: faker.lorem.sentence().toLowerCase()
  };
  const dialog2 ={
    speech: faker.lorem.sentence().toLowerCase(),
    answer: faker.lorem.sentence().toLowerCase()
  };

  beforeAll(async () => {
    await request
      .post("/v1/user/register")
      .send(user);

    const response1 = await request
      .get("/v1/user/login")
      .auth(user.email, user.password);

    const decoded = await jwt.verify(response1.body.token);
    
    authorization = `Bearer ${response1.body.token}`;
    userId = decoded.id;
  
    await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialog1);

    const response2 = await request
      .get("/v1/dialog")
      .query({ speech: dialog1.speech });

    dialogId = response2.body[0].id;
  
    await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialog2);
  });

  it("Check the limit with a valid value", async () => {
    const limit = "1";
    const response = await request
      .get("/v1/dialog")
      .set("limit", limit);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
  
  it("Check the limit with an invalid value", async () => {
    const response = await request
      .get("/v1/dialog")
      .set("limit", "invalidLimit");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
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
    expect(page1.body[0].id).not.toBe(page2.body[0].id);
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
    const responseStatus = await request
      .get("/v1/dialog")
      .query({ status: "ANALYZING" });
    
    const responseUser = await request
      .get("/v1/dialog")
      .query({ owner: userId });
    
    const responseId = await request
      .get("/v1/dialog")
      .query({ id: dialogId });

    const responseSpeech = await request
      .get("/v1/dialog")
      .query({ speech: dialog1.speech });

    const responseAnswer = await request
      .get("/v1/dialog")
      .query({ answer: dialog1.answer });

    expect(responseId.body[0].id).toBe(dialogId);
    expect(responseStatus.body[0].status).toBe("ANALYZING");
    expect(responseUser.body[0].owner.id).toBe(userId);
    expect(responseSpeech.body[0].speech).toBe(captalize(dialog1.speech));
    expect(responseAnswer.body[0].answer).toBe(captalize(dialog1.answer));
  });

  it("Check if ignore invalid query", async () => {
    const response = await request
      .get("/v1/dialog")
      .query({ invalid: "invalid" });

    expect(response.status).toBe(200);
    expect(response.header["x-total-count"]).toBe("2");
  });

  it("Check return of fields and status", async () => {
    const response = await request.get("/v1/dialog");

    expect(response.status).toBe(200);
    expect(response.body[0].approvals).toHaveLength(0);
  });
});
