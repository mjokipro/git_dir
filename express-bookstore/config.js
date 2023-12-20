/** Common settings for auth-api app. */

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql://postgres:newpassword@localhost/books_db_test";
} else {
  DB_URI = "postgresql://postgres:newpassword@localhost/books_db";
}

module.exports = {
  DB_URI
};