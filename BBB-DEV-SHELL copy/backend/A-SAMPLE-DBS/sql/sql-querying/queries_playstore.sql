-- Comments in SQL Start with dash-dash --

-- Number 1 --
SELECT app_name
FROM analytics
WHERE id = 1880;

-- Number 2 --
SELECT id, app_name
FROM analytics
WHERE last_updated = '2018-08-01';

-- Number 3 --
SELECT category, count(*)
FROM analytics
GROUP BY category;

-- Number 4 --
SELECT *
FROM analytics
ORDER BY reviews DESC
LIMIT 5;

-- Number 5 --
SELECT *
FROM analytics
WHERE rating >= 4.8
ORDER BY reviews DESC
LIMIT 1; 

-- Number 6 --
SELECT category, AVG(rating) as average
FROM analytics
GROUP BY category
ORDER BY average DESC;

--  Number 7  --
SELECT app_name, price, rating
FROM analytics
WHERE rating < 3
ORDER BY price DESC
LIMIT 1;

-- Number 8 --
SELECT *
FROM analytics
WHERE min_installs < 50 and rating IS NOT NULL
ORDER BY rating DESC;

-- Number 9 --
SELECT app_name, rating
FROM analytics
WHERE rating < 3 AND reviews > 10000
ORDER BY rating DESC;

-- Number 10 --
SELECT app_name, rating, price
FROM analytics
WHERE rating != 0 AND price BETWEEN .10 AND 1.00
ORDER BY rating DESC
LIMIT 10;

-- Number 11 --
SELECT *
FROM analytics
WHERE last_updated = (SELECT MIN(last_updated) FROM analytics);

-- or --
SELECT *
FROM analytics
ORDER BY last_updated LIMIT 1;

-- Number 12 --
SELECT * FROM analytics
WHERE price = (SELECT MAX(price) FROM analytics)

-- or --
SELECT *
FROM analytics
ORDER BY price LIMIT 1;

-- Number 13 --
SELECT  SUM(reviews) as reviews
FROM analytics;

-- Number 14 --
SELECT category
FROM analytics
GROUP BY category
HAVING COUNT(*) > 300;

-- Number 15 --
SELECT app_name, reviews, min_installs, min_installs / reviews AS ratio
FROM analytics
WHERE min_installs >= 100000
ORDER BY ratio DESC LIMIT 1;

-- Number FS1 --
SELECT app_name, rating, category FROM analytics
WHERE (rating, category) in (
    SELECT MAX(rating), category FROM analytics
    WHERE min_installs >= 50000
    GROUP BY category
)
ORDER BY category;

-- Number FS2 --
SELECT app_name
FROM analytics
WHERE app_name ILIKE '%facebook%';

-- Number FS3 --
SELECT *
FROM analytics
WHERE array_length(genres, 1) =2;

-- Number FS4 --
SELECT * FROM analytics
WHERE genres @> '{"Education"}';