const mongoose = require("mongoose");
const app = require("./app");

const config = require("./utils/config");

const PORT = process.env.PORT || 3000;

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(PORT);
