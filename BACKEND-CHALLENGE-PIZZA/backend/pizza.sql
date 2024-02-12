-- psql < pizza.sql

DROP DATABASE IF EXISTS pizza;
CREATE DATABASE pizza;

\c pizza 

-- DROP DATABASE IF EXISTS pizza_test;
-- CREATE DATABASE pizza_test;

-- \c pizza_test

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    total_items INTEGER,
    total_price FLOAT
);

CREATE TABLE pizzas (
    type VARCHAR(25) PRIMARY KEY,
    description TEXT,
    price FLOAT
);

CREATE TABLE orders_pizzas (
    type VARCHAR(25) REFERENCES pizzas ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders ON DELETE CASCADE,
    qty INTEGER,
    PRIMARY KEY (type, order_id)
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

INSERT INTO orders (user_id, total_items, total_price)
VALUES ('testuser', 4, 5.2), ('testadmin', 5, 6.2);

INSERT INTO pizzas (type, description, price)
VALUES ('pepperoni', 'yummy', 5.2), ('cheese', 'delicious', 6.2);

INSERT INTO orders_pizzas (type, order_id, qty)
VALUES ('pepperoni', 1, 4), ('cheese', 2, 7);