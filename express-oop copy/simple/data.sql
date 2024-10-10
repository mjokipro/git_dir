DROP DATABASE IF EXISTS pets_2;
CREATE DATABASE pets_2;

\c pets_2

CREATE TABLE cats
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    age integer
);

CREATE TABLE dogs
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL, 
    age integer
);

INSERT INTO cats
(name, age)
VALUES
('cat1', 4), ('cat2', 5);

INSERT INTO dogs
(name, age)
VALUES
('dog1', 5), ('dog2', 3);




