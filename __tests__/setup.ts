import connection from "../src/database/connection";

beforeAll(async () => {
  await connection.create();
  await connection.clear();
});

afterAll(async () => {
  await connection.clear();
  await connection.close();
});
