-- psql < challenge-api.sql

DROP DATABASE challenge;
CREATE DATABASE challenge;
\connect challenge

-- DROP DATABASE challenge_test;
-- CREATE DATABASE challenge_test;
-- \connect challenge_test

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE props (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    fav_color TEXT,
    origin TEXT,
    max_dist INTEGER,
    min_age INTEGER,
    max_age INTEGER
);

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO props (username, fav_color, origin, max_dist, min_age, max_age)
VALUES 
('testuser', 'blue', '0000/55', 4, 3, 7),
('testadmin', 'red', '44/66', 55, 33, 77);