-- Comments in SQL Start with dash-dash --

-- Numbers 1 - 3 --
INSERT INTO products(name, price, can_be_returned)
VALUES
    ('chair', 44.00, 'f' ), -- No. 1 --
    ('stool', 25.99, 't' ), -- No. 2 --
    ('table', 124.00, 'f' ); -- No. 3 --


-- Number 4 --
SELECT *
FROM products;

-- Number 5 --
SELECT name
FROM products;

-- Number 6 --
SELECT name, price
FROM products;

-- Number 7 --
INSERT INTO products(name, price, can_be_returned)
    VALUES
        ('bla', 10.99, 'f');

-- Number 8 --
SELECT name
FROM products
WHERE can_be_returned = 't';

-- Number 9 --
SELECT name
FROM products
WHERE price < 44.00;

-- Number 10 --
SELECT name
FROM products
WHERE price BETWEEN 22.50 AND 99.99;

-- Number 11 --
UPDATE products
SET price = price - (price * .2);

--Nunber 12 --
DELETE FROM products
WHERE price < 25;

-- Number 13 --
UPDATE products
SET price = price + 20;

-- Number 14 --
UPDATE products
SET can_be_returned = 't';

