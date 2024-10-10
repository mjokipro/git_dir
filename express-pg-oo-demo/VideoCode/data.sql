--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout
= 0;
SET lock_timeout
= 0;
SET idle_in_transaction_session_timeout
= 0;
SET client_encoding
= 'UTF8';
SET standard_conforming_strings
= on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies
= false;
SET client_min_messages
= warning;
SET row_security
= off;

DROP DATABASE pets_db;
--
-- Name: pets_db; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE pets_db WITH TEMPLATE = template0
ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect pets_db

SET statement_timeout
= 0;
SET lock_timeout
= 0;
SET idle_in_transaction_session_timeout
= 0;
SET client_encoding
= 'UTF8';
SET standard_conforming_strings
= on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies
= false;
SET client_min_messages
= warning;
SET row_security
= off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION
IF NOT EXISTS plpgsql
WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace
= '';

SET default_with_oids
= false;

--
-- Name: cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cats
(
    id integer NOT NULL,
    name text NOT NULL,
    age integer
);


--
-- Name: cats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cats_id_seq
OWNED BY public.cats.id;


--
-- Name: dogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dogs
(
    id integer NOT NULL,
    name text NOT NULL,
    age integer
);


--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dogs_id_seq
OWNED BY public.dogs.id;


--
-- Name: cats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
ALTER COLUMN id
SET
DEFAULT nextval
('public.cats_id_seq'::regclass);


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dogs
ALTER COLUMN id
SET
DEFAULT nextval
('public.dogs_id_seq'::regclass);


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cats
(id, name, age) FROM stdin;
1	Fluffy	7
2	Madame Meow	9
3	Pawsley	2
\.


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dogs
(id, name, age) FROM stdin;
1	Whiskey	6
2	Woofles	3
\.


--
-- Name: cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cats_id_seq', 3, true);


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dogs_id_seq', 2, true);


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
ADD CONSTRAINT cats_pkey PRIMARY KEY
(id);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dogs
ADD CONSTRAINT dogs_pkey PRIMARY KEY
(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

