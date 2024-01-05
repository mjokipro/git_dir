/** Shared config for application; can be req'd many places. */

require('dotenv');

const SECRET_KEY = process.env.SECRET_KEY || 'development-secret-key';

const PORT = +process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = 10;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql://postgres:newpassword@localhost/bankly_test";
} else {
  DB_URI = "postgresql://postgres:newpassword@localhost/bankly";
}

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI
};
