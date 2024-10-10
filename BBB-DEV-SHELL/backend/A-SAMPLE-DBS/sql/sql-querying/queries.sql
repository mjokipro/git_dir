-- write your queries here

-- Number 1 --
SELECT *
FROM owners
LEFT JOIN vehicles
ON owners.id = vehicles.owner_id;

-- Number 2 --
SELECT first_name, last_name, count(*)
FROM owners
RIGHT JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
ORDER BY count(*) ASC;

-- Number 3 --
SELECT first_name, last_name, ROUND(AVG(price)), COUNT(*)
FROM owners
RIGHT JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
HAVING ROUND(AVG(price)) > 10000
ORDER BY count(*) DESC;