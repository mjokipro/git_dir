-- psql < cupcakes_test.sql
-- psql cupcakes_test

DROP DATABASE IF EXISTS cupcakes_test;

CREATE DATABASE cupcakes_test;

\c cupcakes_test

CREATE TABLE cupcakes
(
    id SERIAL PRIMARY KEY,
    flavor TEXT NOT NULL,
    size TEXT NOT NULL,
    rating FLOAT NOT NULL,
    image TEXT NOT NULL
);