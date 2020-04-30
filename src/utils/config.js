require("dotenv").config();

let MONGODB_URI = process.env.DB_PROD;

if (process.env.NODE_ENV === "tests") {
  MONGODB_URI = process.env.DB_TEST;
}

module.exports = { MONGODB_URI };
