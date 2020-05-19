const faker = require("faker");
const JwtManager = require("../../src/utils/jwtManager");

it("Check if jwt manager generate a no-undefined token", () => {
  const fakeValue = faker.random.uuid();

  const jwt = new JwtManager();

  const token = jwt.generate({ value: fakeValue });

  expect(token).toBeDefined();
});

it("Check if the jwt manager decodes the token and returns the fake value generated", async () => {
  const fakeValue = faker.random.uuid();

  const jwt = new JwtManager();

  const token = jwt.generate({ value: fakeValue });

  expect(token).toBeDefined();

  const decode = await jwt.verify(token);

  expect(decode).toBeDefined();
  expect(decode.value).toBe(fakeValue);
});

it("Check if the jwt manager reject a invalid token", async () => {
  const jwt = new JwtManager();

  const invalidToken = faker.random.number();

  const callIfTokenIsInvalid = jest.fn();

  try {
    await jwt.verify(invalidToken);
  } catch (error) {
    callIfTokenIsInvalid();
  }

  expect(callIfTokenIsInvalid).toHaveBeenCalled();
});
