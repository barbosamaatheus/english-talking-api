import faker from "faker";
import supertest from "supertest";

import app from "../../../src/app";

describe("Create Dialog", () => {
  const request = supertest(app);
  
  let authorization: string;
  
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.imageUrl(),
  };
  const dialog = {
    speech: faker.lorem.sentence(),
    answer: faker.lorem.sentence()
  };
  const dialogWithoutAnswer = {
    speech: faker.lorem.sentence()
  };
  const dialogWithoutSpeech = {
    answer: faker.lorem.sentence()
  };
  
  beforeAll(async () => {
    await request
      .post("/v1/user/register")
      .send(user);

    const response = await request
      .get("/v1/user/login")
      .auth(user.email, user.password);
  
    authorization = `Bearer ${response.body.token}`;
  });

  it("Check dialogue creation with all fields correctly filled.", async () => {
    const response1 = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialog);

    const response2 = await request
      .get("/v1/dialog")
      .query({ speech: dialog.speech });

    expect(response1.status).toBe(201);
    expect(response2.body[0].speech).toBe(dialog.speech.toLowerCase());
    expect(response2.body[0].answer).toBe(dialog.answer.toLowerCase());
    expect(response2.body[0].status).toBe("ANALYZING");
  });

  it("Check dialogue creation without sending the field answer.", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialogWithoutAnswer);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Speech or Answer not sent");
  });
  
  it("Check dialogue creation without sending speech field.", async () => {
    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send(dialogWithoutSpeech);
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Speech or Answer not sent");
  });
});
