const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.DB_PROD;
const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(MONGODB_URI, mongooseOpts);

app.listen(PORT);
