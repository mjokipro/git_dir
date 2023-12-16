const { Client } = require("pg");

let DB_URI;

// If we're running in test "mode", use our test db
// Make sure to create both databases!
if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql://postgres:newpassword@localhost/lunchly_test";
} else {
  DB_URI = "postgresql://postgres:newpassword@localhost/lunchly";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;