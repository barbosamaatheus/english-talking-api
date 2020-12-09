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

describe("Create Dialog", () => {
  it("Check dialogue creation with all fields correctly filled.", async () => {
    const speech = faker.lorem.sentence();
    const answer = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ speech, answer });

    expect(response.status).toBe(201);
    expect(response.body.data.speech).toBe(speech);
    expect(response.body.data.answer).toBe(answer);
    expect(response.body.data.status).toBe("ANALYZING");
  });

  it("Check dialogue creation without sending the field answer.", async () => {
    const speech = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ speech });

    expect(response.status).toBe(400);
  });

  it("Check dialogue creation without sending speech field.", async () => {
    const answer = faker.lorem.sentence();

    const response = await request
      .post("/v1/dialog")
      .set("Authorization", authorization)
      .send({ answer });

    expect(response.status).toBe(400);
  });
});
