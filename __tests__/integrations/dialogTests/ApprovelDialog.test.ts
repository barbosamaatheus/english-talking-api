/* eslint-disable dot-notation */
import supertest from "supertest";
import faker from "faker";
import app from "../../../src/app";


describe("Dialog Approval", () => {
  const request = supertest(app);
  
  let dialogId: string;
  let authorization: string;

  const user1 = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  };
  const user2 = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  };
  const dialog = {
    speech: faker.lorem.words(),
    answer: faker.lorem.sentence()
  };
  
  beforeAll(async () => {
    await request
      .post("/v1/user/register")
      .send(user1);

    const response1 = await request
      .get("/v1/user/login")
      .auth(user1.email, user1.password);

    authorization = `Bearer ${response1.body.token}`;

    await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialog);
    
    const response2 = await request
      .get("/v1/dialog")
      .query({ speech: dialog.speech });
  
    dialogId = response2.body[0].id;
  });
  
  it("Check successful dialogue approval", async () => {
    const response = await request
      .patch(`/v1/dialog/${dialogId}/approve`)
      .set("Authorization", authorization);

    const consult = await request
      .get("/v1/dialog")
      .query({ id: dialogId });

    expect(response.status).toBe(204);
    expect(consult.status).toBe(200);
    expect(consult.body[0].status).toBe("APPROVED");
  });

  it("Check approval of non-existent dialogue", async () => {
    const fakeDialogId = faker.random.uuid();

    const response = await request
      .patch(`/v1/dialog/${fakeDialogId}/approve`)
      .set("Authorization", authorization);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Resource not found");
  });

  it("Check behavior with the user already experienced in this dialog", async () => {
    await request
      .patch(`/v1/dialog/${dialogId}/approve`)
      .set("Authorization", authorization);

    const response = await request
      .patch(`/v1/dialog/${dialogId}/approve`)
      .set("Authorization", authorization);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User has already approved this dialog");
  });

  it("Verify that the pass rate is less than 70", async () => {
    await request
      .post("/v1/user/register")
      .send(user2);
    
    const response = await request
      .get("/v1/user/login")
      .auth(user2.email, user2.password);

    const newToken = `Bearer ${response.body.token}`;

    const responseApproval = await request
      .patch(`/v1/dialog/${dialogId}/approve`)
      .set("Authorization", newToken);

    const responseDisapproval = await request
      .patch(`/v1/dialog/${dialogId}/disapprove`)
      .set("Authorization", authorization);

    const consult = await request
      .get("/v1/dialog")
      .query({ id: dialogId });

    
    expect(responseApproval.status).toBe(204);
    expect(responseDisapproval.status).toBe(204);
    expect(consult.status).toBe(200);
    expect(consult.body[0].status).toBe("ANALYZING");
  });

  it("Verify removal of the user from the list of disapprovals", async () => {
    await request
      .patch(`/v1/dialog/${dialogId}/disapprove`)
      .set("Authorization", authorization);

    await request
      .patch(`/v1/dialog/${dialogId}/approve`)
      .set("Authorization", authorization);

    const consult = await request
      .get("/v1/dialog")
      .query({ id: dialogId });

    expect(consult.body[0].disapprovals).toEqual([]);
  });
});
