-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  artist TEXT
);

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  album TEXT
);

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  producer TEXT
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE ,
  artist_1 INTEGER REFERENCES artists ON DELETE CASCADE,
  artist_2 INTEGER REFERENCES artists ON DELETE CASCADE,
  album_id INTEGER REFERENCES albums ON DELETE CASCADE,
  producer_1 INTEGER REFERENCES producers ON DELETE CASCADE,
  producer_2 INTEGER REFERENCES producers ON DELETE CASCADE
);

INSERT INTO artists(artist)
VALUES
 ('{"Hanson"}'), ('{"Queen"}'), ('{"Mariah Cary"}'), ( '{"Lady Gaga"}'), ('{"Nickelback"}'),
 ('{"Jay Z"}'), ( '{"Katy Perry"}'), ('{"Maroon 5"}'), ('{"Avril Lavigne"}'), 
 ('{"Destiny''s Child"}'), ('{"Boyz II Men"}'), ( '{"Bradley Cooper"}'),  ('{"Alicia Keys"}'),
 ('{"Juicy J"}'), ('{"Christina Aguilera"}'), ('{"None"}');

INSERT INTO albums(album)
VALUES
 ('Middle of Nowhere'), ('A Night at the Opera'), ('Daydream'), ('A Star Is Born'),
 ('Silver Side Up'), ('The Blueprint 3'), ('Prism'), ('Hands All Over'), ('Let Go'),
 ('The Writing''s on the Wall');

INSERT INTO producers(producer)
VALUES
 ('{"Dust Brothers"}'), ('{"Roy Thomas Baker"}'), ( '{"Walter Afanasieff"}'),
 ('{"Benjamin Rice"}'), ('{"Rick Parashar"}'), ( '{"Al Shux"}'), ('{"Max Martin"}'),
 ('{"Shellback"}'), ('{"The Matrix"}'), ('{"Darkchild"}'), ('{"Stephen Lironi"}'), ( '{"Cirkut"}'),
 ('{"Benny Blanco"}'), ('{"None"}');


INSERT INTO songs
  (title, duration_in_seconds, release_date, artist_1, artist_2, album_id, producer_1, producer_2)
VALUES
('MMMBop',	238,	 '04-15-1997',	1,	16,	1,	1,	11),
('Bohemian Rhapsody',	355,	 '10-31-1975',	2,	16,	2,	2,	14),
('One Sweet Day',	282,	 '11-14-1995',	3,	11,	3,	3,	14),
('Shallow',	216,	 '09-27-2018',	4,	12,	4,	4,	14),
('How You Remind Me',	223,	 '08-21-2001',	5,	16,	5,	5,	14),
('New York State of Mind',	276,	 '10-20-2009',	6,	13,	6,	6,	14),
('Dark Horse',	215,	 '12-17-2013',	7,	14,	7,	7,	12),
('Moves Like Jagger',	201,	 '06-21-2011',	8,	15,	8,	8,	13),
('Complicated',	244,	 '05-14-2002',	9,	16,	9,	9,	14),
('Say My Name',	240,	 '11-07-1999',	10,	16,	10,	10,	14);
