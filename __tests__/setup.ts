import { connect as createConnection, connection, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

beforeAll(async () => {
  const MONGODB_URI = await mongod.getConnectionString();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  await createConnection(MONGODB_URI, mongooseOpts);
});
afterAll(async () => {
  await connection.dropDatabase();
  await disconnect();
  await mongod.stop();
});
