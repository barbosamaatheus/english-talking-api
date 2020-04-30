const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./utils/config");

const app = express();

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

module.exports = { app, mongoose };
