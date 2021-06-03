import express from "express";
import "express-async-errors"

import "./config/env";
import routes from "./routes";
import errorHandler from './errors/ErrorHandler'

const app = express();

app.use(express.json());
app.use("/v1", routes);
app.use(errorHandler.exec);

export default app;
