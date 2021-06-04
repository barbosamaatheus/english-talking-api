import app from "./app";
import connection from "./database/connection";

const PORT = process.env.PORT || 3000;

const createConnection = async () => {
  await connection.create();
};

createConnection();

app.listen(PORT, () => console.log("Server started!"));
