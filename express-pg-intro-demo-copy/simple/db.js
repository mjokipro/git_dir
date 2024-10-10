/** Database setup for users. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///usersdb_test";
} else {
  DB_URI = "postgresql:///usersdb";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect((err) => {
  if(err){
    console.error("connection error", err.stack)
  } else {
    console.log("connected to psql db")
  }
});

module.exports = db;
