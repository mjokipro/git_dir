-- psql < cupcakes.sql
-- psql cupcakes

DROP DATABASE IF EXISTS cupcakes;

CREATE DATABASE cupcakes;

\c cupcakes

CREATE TABLE cupcakes
(
    id SERIAL PRIMARY KEY,
    flavor TEXT NOT NULL,
    size TEXT NOT NULL,
    rating FLOAT NOT NULL,
    image TEXT NOT NULL
);