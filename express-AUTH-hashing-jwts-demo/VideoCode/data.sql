DROP DATABASE IF EXISTS express_auth;
CREATE DATABASE express_auth;

\c express_auth

CREATE TABLE users
(
  username TEXT NOT NULL PRIMARY KEY,
  password TEXT NOT NULL
);

\q