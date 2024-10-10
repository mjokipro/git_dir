/** Common settings for auth-api app. */

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql://postgres:newpassword@localhost/express_auth_test";
} else {
  DB_URI = "postgresql://postgres:newpassword@localhost/express_auth";
}

const SECRET_KEY = process.env.SECRET_KEY || "fHt$TRcC%25HmE8gC'vD$!Ka%8sOt;~V,XItr+8t+)8;x}O/rSQgGyG7}o^c1')"

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};

// const { Client } = require("pg");

// let DB_URI;

// // If we're running in test "mode", use our test db
// // Make sure to create both databases!
// if (process.env.NODE_ENV === "test") {
//   DB_URI = "postgresql://postgres:newpassword@localhost/users_test";
// } else {
//   DB_URI = "postgresql://postgres:newpassword@localhost/users";
// }

// let db = new Client({
//   connectionString: DB_URI
// });

// db.connect();

// module.exports = db;