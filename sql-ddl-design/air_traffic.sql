-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE customers(
    id SERIAL PRIMARY KEY,
    cust_l_name VARCHAR(50),
    cust_f_name VARCHAR(50)
);



CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    seat_num VARCHAR(3) 
);

CREATE TABLE airlines (
    id SERIAL PRIMARY KEY,
    airline_name VARCHAR(255)
);


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    tk_cust_id INTEGER REFERENCES customers ON DELETE CASCADE,
    tk_seat_id INTEGER REFERENCES seats ON DELETE CASCADE,
    tk_depart_time TIMESTAMP,
    tk_arrive_time TIMESTAMP,
    tk_airline_id INTEGER REFERENCES airlines ON DELETE CASCADE,
    tk_from_city_id INTEGER REFERENCES cities ON DELETE CASCADE,
    tk_from_country_id INTEGER REFERENCES countries ON DELETE CASCADE,
    tk_to_city_id INTEGER REFERENCES cities ON DELETE CASCADE,
    tk_to_country_id INTEGER REFERENCES countries ON DELETE CASCADE
);




INSERT INTO customers(cust_l_name, cust_f_name)
VALUES
  ('Finch',	'Jennifer'),
  ('Gathercoal',	'Thadeus'),
  ('Leathes'	, 'Alvin'),
  ('Pauley'	, 'Sonja'),
  ('Skeleton',	'Waneta'),
  ('Squibbes', 'Cory'),
  ('Wycliff',	'Berkie');

  INSERT INTO cities(city)
VALUES
 ('Beijing'), ('Casablanca'), ('Cedar Rapids'), ('Charlotte'),
 ('Chicago'), ('Dubai'), ('Las Vegas'), ('London'), ('Los Angeles'),
 ('Mexico City'), ('New Orleans'), ('New York'), ('Paris'),
 ('Santiago'), ('Sao Paolo'), ('Seattle'), ('Tokyo'), ('Washington DC');

INSERT INTO countries(country)
VALUES
 ('Brazil'), ( 'Chile'), ('China'), ('France'), ('Japan'),
 ('Mexico'), ('Morocco'), ( 'UAE'), ( 'United Kingdom'), ( 'United States');

INSERT INTO seats(seat_num)
VALUES
( '10D'), ( '12F'), ( '18C'), ( '1A'), ( '20A'), ( '23D'),
( '32B'), ( '33B'), ( '8A'), ( '9E');

INSERT INTO airlines(airline_name)
VALUES
( 'Air China'), ( 'American Airlines'), ( 'Avianca Brasil'), ( 'British Airways'),
( 'Delta'), ( 'TUI Fly Belgium'), ( 'United');

INSERT INTO tickets(tk_cust_id, tk_seat_id, tk_depart_time, tk_arrive_time, tk_airline_id, tk_from_city_id, tk_from_country_id, tk_to_city_id, tk_to_country_id)
VALUES
(1, 8	, '2018-04-08 09:00:00'	, '2018-04-08 12:00:00',	7,	18	,10	,16,	10),
(1, 5	, '2018-04-15 16:50:00',	 '2018-04-15 21:00:00',	5,	16,	10,	10,	6),
(2, 9,	 '2018-12-19 12:45:00',	 '2018-12-19 16:15:00',	4,	17,	5,	8,	9),
(2, 3,	 '2018-10-31 01:15:00',	 '2018-10-31 12:55:00',	1,	6,	8,	1,	3),
(3, 4,	 '2018-12-22 14:42:00',	 '2018-12-22 15:56:00',	2	,3,	10,	5,	10),
(4, 2,	 '2018-01-02 07:00:00',	 '2018-01-02 08:03:00',	5,	9,	10,	7,	10),
(5, 6,	 '2018-08-01 18:30:00',	 '2018-08-01 21:50:00',	6,	13,	4,	2,	7),
(6, 1,	 '2019-01-20 19:30:00',	 '2019-01-20 22:45:00',	3,	15,	1,	14,	2),
(7, 10,	 '2019-02-06 06:00:00',	 '2019-02-06 07:47:00',	7,	12,	10,	4,	10),
(7, 7	, '2019-02-06 16:28:00',	 '2019-02-06 19:18:00',	2,	4,	10,	11,	10);

