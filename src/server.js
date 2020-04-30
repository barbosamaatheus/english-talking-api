const mongoose = require("mongoose");
const app = require("./app");

const config = require("./utils/config");

const PORT = process.env.PORT || 3000;

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Conectado: ", config.MONGODB_URI);
app.listen(PORT);
