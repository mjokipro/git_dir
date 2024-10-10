## Goals

-   Learn what makes SQL databases “relational”
-   Understand one-to-many and many-to-many relationships
-   Describe and make use of the different types of joins (inner, outer)

## Data Example: Movies

| id | title | studio | founded\_in |
| --- | --- | --- | --- |
| 1 | Star Wars: The Force Awakens | Walt Disney Studios Motion Pictures | 1953-06-23 |
| 2 | Avatar | 20th Century Fox | 1935-05-31 |
| 3 | Black Panther | Walt Disney Studios Motion Pictures | 1953-06-23 |
| 4 | Jurassic World | Universal Pictures | 1912-04-30 |
| 5 | Marvel’s The Avengers | Walt Disney Studios Motion Pictures | 1953-06-23 |

-   So much duplication! (of studio name, founded_in date)
	-  If the studio name changes, have to change it in multiple places
	-   What if we want other info about studios besides founding date?
		- Adding CEO, zip code of studio, etc. would 
- This table has two entities: 
	- Movies
	- Studios
- & Entities should instead be separated into their own table

### A Better Way
| id | title | studio\_id |
| --- | --- | --- |
| 1 | Star Wars: The Force Awakens | 1 |
| 2 | Avatar | 2 |
| 3 | Black Panther | 1 |
| 4 | Jurassic World | 3 |
| 5 | Marvel’s The Avengers | 1 |

| id | name | founded\_in |
| --- | --- | --- |
| 1 | Walt Disney Studios Motion Pictures | 1953-06-23 |
| 2 | 20th Century Fox | 1935-05-31 |
| 3 | Universal Pictures | 1912-04-30 |
![[relationships-sql-1678812481866.jpeg]]
### One-to-Many (1:M)

![[relationships-sql-1678801419103.jpeg]]
- This type of schema drawing uses **crow’s foot notation** — the feet go on the “many” side.
	- The *PRIMARY KEY* is in bold in this diagram
	- *PRIMARY KEY* : Single thing that is unique about a table
-   studio\_id column gives us reference to record in studios with that id.
    -   This makes a **foreign key constraint**; ensuring every studio\_id is in studios.
- & **One-to-Many**: one studio _has many_ movies, but each movie _has one_ studio.
    -   movies is **referencing** table, and studios is **referenced** table.
- Databases will never let you lie – they keep **Referential Integrity** with these relationships:
	- Cannot add or delete items that don’t uphold this relationship.
		- example: Cannot add a movie that lists a studio that doesn’t exist in studios tables

### Foreign Key Constraints

- *FOREIGN KEY*: When you refer to another table’s primary key
	- In terms of the relationships covered, the *FOREIGN KEY* goes on the ‘many’ object
		- e.g. One dept to many employees - foreign key goes on employee
- Setting up a foreign key constraint with DDL(schema):
```sql
CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  founded_in DATE);
```

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT,
  runtime INT,
  rating TEXT,
  studio_id INT REFERENCES studios);
```

- Constraints are specified by the DDL(schema), but affect DML(data) query behavior:
```sql
INSERT INTO studios (name, founded_in) VALUES
  ('Walt Disney Studios Motion Pictures', '1953-06-23'),
  ('20th Century Fox', '1935-05-31'),
  ('Universal Pictures', '1912-04-30');
```

```sql
-- reference Disney's primary key
INSERT INTO movies (title, studio_id)
  VALUES ('Star Wars: The Force Awakens', 1);
```

```sql
-- Throws an Foreign Key Constraint Error...
--  There is no studio with a primary key of 1000
INSERT INTO movies (title, studio_id)
  VALUES ('Black Panther', 1000);
```

### Deleting Data Examples

- When trying to delete a studio…

- We cannot delete it outright while movies still reference it.
```sql
DELETE FROM studios WHERE id=1;  -- error
```

- Option 1: NULL `studio_id` field of movies that reference it *(if can be NULL)*.
```sql
UPDATE movies SET studio_id=NULL WHERE studio_id=1;
DELETE FROM studios WHERE id=1;
```

- Option 2: Delete the movies associated with that studio first.
```sql
DELETE FROM movies WHERE studio_id=1;
DELETE FROM studios WHERE id=1;
```

## Joining Tables

-   *JOIN* allows us to get results combining info from multiple tables
-   Data from tables is matched according to a _join condition_
-   Usually, join condition involves comparing:
    -   a **foreign key** from one table _(movies.studio\_id)_, and
    -   **primary key** in another table _(studios.id)_
- If there are any names in common, you must specify which you mean
	- movies.name  or   studio.name, etc.

### Setting Up the Data

```sql
CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  founded_in DATE);
```

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT,
  runtime INT,
  rating TEXT,
  studio_id INT REFERENCES studios);
```

```sql
INSERT INTO studios
  (name, founded_in)
VALUES
  ('Walt Disney Studios Motion Pictures', '1953-06-23'),
  ('20th Century Fox', '1935-05-31'),
  ('Universal Pictures', '1912-04-30');
```

```sql
INSERT INTO movies
  (title, release_year, runtime, rating, studio_id)
VALUES
  ('Star Wars: The Force Awakens', 2015, 136, 'PG-13', 1),
  ('Avatar', 2009, 160, 'PG-13', 2),
  ('Black Panther', 2018, 140, 'PG-13', 1),
  ('Jurassic World', 2015, 124, 'PG-13', 3),
  ('Marvel’s The Avengers', 2012, 142, 'PG-13', 1);

```

### Our First Join

```sql
SELECT title, name
  FROM movies
    JOIN studios
      ON studios.id = movies.studio_id;
```

```sql
SELECT title, name
  FROM movies
    INNER JOIN studios
      ON studios.id = movies.studio_id;
```

- *JOIN* and I*NNER JOIN*are the same; the *INNER* keyword is optional.

### Types of Joins

- There are two primary types of joins: inner and outer.
	-   **Inner**
		-  Only the rows that match the condition in both tables.
	-   **Outer**
		- Left: all rows from left table, combined with matching rows from right.
		- Right: all rows from right table, combined with matching rows from left.
		- Full - All the rows from both tables (left and right).
- Almost never use RIGHT OUTER  JOIN, and some programs don’t support it. 
	- Instead, flip the order of how this is written, and use LEFT OUTER JOIN:
	  FROM movies JOIN studios ….       
	  FROM studios JOIN movies ….

### Join Diagrams

![images/sql-joins.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/sql-joins/handout/_images/sql-joins.png)


### Joins in Practice

-   You’ll use **INNER** joins most often
-   **OUTER** joins will find rows in one table even with no match in other table
    -   eg, an movie with a NULL studio _or_ a studio with no films
-   **Outer** join example:

```sql
-- insert an indie movie (the studio_id is left out)
INSERT INTO movies (title, release_year, runtime, rating, studio_id)
  VALUES ('Memento', 2000, 113, 'R', NULL);
```

```sql
-- this query will include the indie movie
SELECT name
  FROM movies
    LEFT OUTER JOIN studios
      ON studios.id = movies.studio_id;
```

## Many-to-Many

### Actors and Roles

-   We’ve seen a one-to-many relationship: one studio has many movies
-   But not all relationships can be expressed in this way…
	-   eg, one movie has many actors, but each actor has roles in many movies!
-   This is an example of a _many-to-many_ relationship.
-   A _many-to-many_ is just two *one-to-many*’s back-to-back!

![[relationships-sql-1678802821910.jpeg]]
-   Each actor has many roles (1:M)
-   Each movie has many roles (1:M)
-   Actor and movie don’t relate directly — but through roles! (M:M)

### Setting Up Actors and Roles

```sql
CREATE TABLE actors (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE);
```

```sql
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER REFERENCES movies,
  actor_id INTEGER REFERENCES actors);
```

```sql
INSERT INTO actors
  (first_name, last_name, birth_date)
VALUES
  ('Scarlett', 'Johansson', '1984-11-22'),
  ('Samuel L', 'Jackson', '1948-12-21'),
  ('Kristen', 'Wiig', '1973-08-22');
```

```sql
INSERT INTO roles
  (movie_id, actor_id)
VALUES
  (1, 1),
  (1, 2),
  (3, 2);
```

### Many-to-Many (M:N)

- Let’s see what the movies, actors and roles tables look like!

Movies   
| id | title | release\_year | runtime | rating |
| --- | --- | --- | --- | --- |
| 1 | Marvel’s The Avengers | 2012 | 142 | PG-13 |
| 2 | Avatar | 2009 | 160 | PG-13 |
| 3 | Star Wars: Episode I | 1999 | 133 | PG |

Actors
| id | first\_name | last\_name | birth\_date |
| --- | --- | --- | --- |
| 1 | Scarlett | Johansson | 1984-11-22 |
| 2 | Samuel L | Jackson | 1948-12-21 |
| 3 | Kristen | Wiig | 1973-08-22 |

Roles
| id | movie\_id | actor\_id |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 1 | 2 |
| 3 | 3 | 2 |

### Join Tables

-   The roles table is often called a _join table_ or _association table_
- &  A join table connects two tables in a many-to-many relationship.
-   The join table consists of, at a minimum: two foreign key columns to the two other tables in the relationship.
-   The join table can have other columns (eg how much was actor paid for role).
-   Join tables are often named in one of a few ways:
    -   If there’s a good, obvious name for it (e.g. roles)
    -   If not, use both other tables (e.g. movies_actors )
    -   For complex databases, some people use both (e.g. movies_actors_roles)

### Querying a Many-to-Many

- Connecting movies and actors:
```sql
SELECT title, first_name, last_name
  FROM movies
    JOIN roles
      ON movies.id = roles.movie_id
    JOIN actors
      ON roles.actor_id = actors.id;
```

- Selecting certain columns, using table alias shorthand:
```sql
SELECT m.title, a.first_name, a.last_name
  FROM movies AS m
    JOIN roles AS r
      ON m.id = r.movie_id
    JOIN actors AS a
      ON r.actor_id = a.id;
```

- The AS keyword is optional (you can leave it, like `FROM movies m`), but using it makes easier to read

- Get (id, first name, last name) of actors who have been in more than one movie:
```sql
SELECT a.id, a.first_name, a.last_name
 FROM movies AS m
   JOIN roles AS r
     ON m.id = r.movie_id
   JOIN actors AS a
     ON r.actor_id = a.id
 GROUP BY a.id, a.first_name, a.last_name
 HAVING count(*) >= 2;
```

### Finding All Actors And Their Movies

- A trickier problem: list _all_ actors, along with any movies they’ve been in:
```sql
SELECT a.id, a.first_name, a.last_name, m.title
 FROM actors AS a
   JOIN roles AS r
     ON a.id = r.actor_id
   JOIN movies AS m
     ON r.movie_id = m.id;
```

- We won’t get actors who’ve never been in a movie!
```sql
SELECT a.id, a.first_name, a.last_name, m.title
 FROM actors AS a
   LEFT OUTER JOIN roles AS r
     ON a.id = r.actor_id
   LEFT OUTER JOIN movies AS m
     ON r.movie_id = m.id;
```

### Be Careful with COUNT()

- ! When `COUNT(*)` is used with *JOIN*, watch out for it counting ‘null’ as a value.
- $ To prevent this, pass the exact joined table column to count into the function, and it will instead show 0 instead of the false 1 for these occurrences:
	- `COUNT(r.id)`
![[relationships-sql-1678845914544.jpeg]]
