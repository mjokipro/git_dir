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

INSERT INTO tickets
  (tk_f_name, tk_l_name, tk_seat_num, depart_time, arrive_time, tk_airline_id, tk_from_city_id, tk_from_country_id, tk_to_city_id, tk_to_country_id)
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