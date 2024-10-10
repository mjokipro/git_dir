-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE "customers" (
    "id" int   NOT NULL,
    "cust_f_name" string   NOT NULL,
    "cust_l_name" string   NOT NULL,
    CONSTRAINT "pk_customers" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "locations" (
    "id" int   NOT NULL,
    "lc_cities_id" varchar(3)   NOT NULL,
    "lc_countries_id" varchar(3)   NOT NULL,
    CONSTRAINT "pk_locations" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "planes" (
    "id" int   NOT NULL,
    "seat_nums" varchar(3)   NOT NULL,
    CONSTRAINT "pk_planes" PRIMARY KEY (
        "id","seat_nums"
     )
);

CREATE TABLE "airlines" (
    "id" int   NOT NULL,
    "plane_id" int   NOT NULL,
    CONSTRAINT "pk_airlines" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "tickets" (
    "id" int   NOT NULL,
    "tk_f_name" int   NOT NULL,
    "tk_l_name" int   NOT NULL,
    "depart_time" TIMESTAMP   NOT NULL,
    "arrive_time" TIMESTAMP   NOT NULL,
    "tk_to_city_id" int   NOT NULL,
    "tk_from_city_id" int   NOT NULL,
    "tk_to_country_id" int   NOT NULL,
    "tk_from_country_id" int   NOT NULL,
    "tk_seat_num" varchar(3)   NOT NULL,
    "tk_airline_id" int   NOT NULL,
    CONSTRAINT "pk_tickets" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "airlines" ADD CONSTRAINT "fk_airlines_plane_id" FOREIGN KEY("plane_id")
REFERENCES "planes" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_f_name" FOREIGN KEY("tk_f_name")
REFERENCES "customers" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_l_name" FOREIGN KEY("tk_l_name")
REFERENCES "customers" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_to_city_id" FOREIGN KEY("tk_to_city_id")
REFERENCES "locations" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_from_city_id" FOREIGN KEY("tk_from_city_id")
REFERENCES "locations" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_to_country_id" FOREIGN KEY("tk_to_country_id")
REFERENCES "locations" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_from_country_id" FOREIGN KEY("tk_from_country_id")
REFERENCES "locations" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_seat_num" FOREIGN KEY("tk_seat_num")
REFERENCES "airlines" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_tk_airline_id" FOREIGN KEY("tk_airline_id")
REFERENCES "airlines" ("id");

INSERT INTO customers
  (tk_f_name, tk_l_name)
VALUES
  ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'United', 'Washington DC', 'United States', 'Seattle', 'United States'),
  ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'British Airways', 'Tokyo', 'Japan', 'London', 'United Kingdom'),
  ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Delta', 'Los Angeles', 'United States', 'Las Vegas', 'United States'),
  ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Delta', 'Seattle', 'United States', 'Mexico City', 'Mexico'),
  ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'TUI Fly Belgium', 'Paris', 'France', 'Casablanca', 'Morocco'),
  ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Air China', 'Dubai', 'UAE', 'Beijing', 'China'),
  ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'United', 'New York', 'United States', 'Charlotte', 'United States'),
  ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'American Airlines', 'Cedar Rapids', 'United States', 'Chicago', 'United States'),
  ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'American Airlines', 'Charlotte', 'United States', 'New Orleans', 'United States'),
  ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Avianca Brasil', 'Sao Paolo', 'Brazil', 'Santiago', 'Chile');

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
(8	, '2018-04-08 09:00:00'	, '2018-04-08 12:00:00',	7,	18	,10	,16,	10),
(5	, '2018-04-15 16:50:00',	 '2018-04-15 21:00:00',	5,	16,	10,	10,	6),
(9,	 '2018-12-19 12:45:00',	 '2018-12-19 16:15:00',	4,	17,	5,	8,	9),
(3,	 '2018-10-31 01:15:00',	 '2018-10-31 12:55:00',	1,	6,	8,	1,	3),
(4,	 '2018-12-22 14:42:00',	 '2018-12-22 15:56:00',	2	,3,	10,	5,	10),
(2,	 '2018-01-02 07:00:00',	 '2018-01-02 08:03:00',	5,	9,	10,	7,	10),
(6,	 '2018-08-01 18:30:00',	 '2018-08-01 21:50:00',	6,	13,	4,	2,	7),
(1,	 '2019-01-20 19:30:00',	 '2019-01-20 22:45:00',	3,	15,	1,	14,	2),
(10,	 '2019-02-06 06:00:00',	 '2019-02-06 07:47:00',	7,	12,	10,	4,	10),
(7	, '2019-02-06 16:28:00',	 '2019-02-06 19:18:00',	2,	4,	10,	11,	10);

