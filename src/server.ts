import { connect as createConnection } from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.DB_PROD as string;

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

createConnection(MONGODB_URI, mongooseOpts);

app.listen(PORT);
