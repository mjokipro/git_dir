-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


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
    "seat_nums" varchar(4)   NOT NULL,
    "pl_model_num" varchar(6)   NOT NULL,
    CONSTRAINT "pk_planes" PRIMARY KEY (
        "id","seat_nums"
     )
);

CREATE TABLE "airlines" (
    "id" int   NOT NULL,
    "airline_name" string   NOT NULL,
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
    "tk_seat_num" int   NOT NULL,
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

