/* eslint-disable dot-notation */
const supertest = require("supertest");
const faker = require("faker");
const app = require("../../../src/app");

const request = supertest(app);

let authorization;
let dialogId;

beforeAll(async () => {
  const response = await request.post("/v1/register").send({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  authorization = `Bearer ${response.body.metadata.token}`;
});

beforeEach(async () => {
  const dialog = await request
    .post("/v1/dialog")
    .set("Authorization", authorization)
    .send({ speech: faker.lorem.sentence(), answer: faker.lorem.sentence() });
  dialogId = dialog.body.data["_id"];
});

describe("Dialog consultation", () => {
  it("Check the rejection of the dialog", async () => {
    const response = await request
      .put(`/v1/dialog/${dialogId}/reject`)
      .set("Authorization", authorization);

    const consultation = await request
      .get("/v1/dialog")
      .query({ _id: dialogId });

    expect(response.statusCode).toBe(204);

    expect(consultation.statusCode).toBe(200);
    expect(consultation.body.data[0].disapprovals[0]).toBeTruthy();
  });

  it("Check the rejection of the non-existent dialogue", async () => {
    dialogId = "5e1a0651741b255ddda996c4"; // This _id not exits

    const response = await request
      .put(`/v1/dialog/${dialogId}/reject`)
      .set("Authorization", authorization);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe("Resource not found");
  });

  it("Check if the bounce rate is less than 70", async () => {
    const responseDisapproval = await request
      .put(`/v1/dialog/${dialogId}/reject`)
      .set("Authorization", authorization);

    const responseApproval = await request
      .put(`/v1/dialog/${dialogId}/approval`)
      .set("Authorization", authorization);

    const consult = await request.get("/v1/dialog").query({ _id: dialogId });

    expect(responseApproval.statusCode).toBe(204);
    expect(responseDisapproval.statusCode).toBe(204);

    expect(consult.statusCode).toBe(200);
    expect(consult.body.data[0].approval_rate).toBe(50);
    expect(consult.body.data[0].status).toBe("analyzing");
  });

  it("Check behavior with the user already experienced in this dialog", async () => {
    await request
      .put(`/v1/dialog/${dialogId}/reject`)
      .set("Authorization", authorization);

    const response = await request
      .put(`/v1/dialog/${dialogId}/reject`)
      .set("Authorization", authorization);

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toBeTruthy();
    expect(response.body.entity).toBe("user");
    expect(response.body.message).toBe(
      "The user has already disapproved of this dialog"
    );
  });
});
