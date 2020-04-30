const mongoose = require("mongoose");

const config = require("../src/utils/config");

beforeAll(async () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("... Test Started");
});
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  console.log("... Test Ended");
});
