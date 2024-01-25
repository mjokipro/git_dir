DROP DATABASE users_practice;
CREATE DATABASE users_practice;

\c users_practice

CREATE TABLE users
(
  username TEXT NOT NULL PRIMARY KEY,
  password TEXT NOT NULL
);

\q