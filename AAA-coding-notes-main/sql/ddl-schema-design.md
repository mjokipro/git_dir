## Goals

-   Learn SQL commands to create, alter, and drop databases/tables
-   Understand the basics of database schema design
-   Learn how to properly model relational data

## DDL Basics

### Creating and Dropping Databases

- Can do in **psql** as SQL:
```sql
=# CREATE DATABASE new_db;

=# DROP DATABASE new_db;
```

- Can do from shell:
```terminal
$ createdb new_db

$ dropdb new_db
```

- % Note: Dropping databases drops SCHEMA and DATA

### Creating Tables

```sql
jane=# CREATE DATABASE movies;
CREATE DATABASE

jane=# \c movies
You are now connected to database "movies" as user "jane".
movies=#
```

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT NOT NULL,
  runtime INT NOT NULL,
  rating TEXT NOT NULL
    CHECK (rating IN
       ('G', 'PG', 'PG-13', 'R', 'NC-17')),
  studio_id INT NOT NULL REFERENCES studios,
  UNIQUE (title, release_year));  -- Together, title and release year must be unique
  --                           can have 2 Top Gun movies, but not 2 entries of Top Gun 2022
```

### REFERENCES

- *REFERENCES* keyword in SQL sets the assigned variable name to associate with the *PRIMARY KEY* of the right named table.
	- e.g. in the above example of studios and movies, studio_id *REFERENCES* the *PRIMARY KEY* of studios

### Inspecting Tables in PostgreSQL

- Listing the tables in the database
```sql
movies=# \dt
```

- Showing schema for a database object _(eg a table)_
```sql
movies=# \d movies
```

### Dropping Tables

```sql
DROP TABLE movies;
```

- % Note: Dropping table drops SCHEMA and DATA
- ! Danger:  Dependent Objects
	- If that table is the referenced table in a relationship, it cannot be dropped until the referencing table is dropped.
	- To do so automatically, you can use `DROP movies CASCADE`. Be careful, though — that could delete a bunch of tables!

## Column Specifications

### Data Types

- Text
	- Text Strings
- Varchar(_n_)
	- Text Strings, but limited to _n_ characters
	- Other than the length restriction, they’re the same as strings
- Int
	- Integer numbers
- Numeric
	- Fixed-precision numbers *(for money and other fixed things)*
	- Takes 2 args *NUMERIC(precision, scale)*
		- precision = how many digits total - default 18
		- scale = how many are right of decimal point
- Float
	- Non-fixed-precision floating-point numbers _(for other things)_
- Boolean
	- True or False  *(Unless not null  is specified, this is still 3 way logic: True, False, Null) *
- Date
	- Date (without time) *(Less useful cause no timezone)*
- Timestamp
	- Date and time without time zone *(the idea of a date time, also less useful without timezone)*
- Timestamp with time zone
	- … with time zone _(an actual point in date time in a place)_
- Serial
	- Auto-incrementing numbers _(generally used for primary keys)_
	- *Will NEVER reuse any numbers* - Only guarentee is that higher numbers were given after lower numbers.
- Other Types!
	- There are lots of other types for handling geospatial information, IP addresses, arrays, and more!

- % Note on Numbers:
	- Numbers derived by measurement = inherently imprecise –> Best to use int/float
	- Numbers that are absolutely decided = price, etc.  –> Best to use Numeric
	- (There are also complex number types with an imaginary number type, etc. if needed for complex math)

### Notes on Data Types:

- ~ What Is Fixed Precision?
	- Computer floating point numbers typically can represent incredibly small numbers or incredibly large numbers, and can also have lots of precision _(you can think of this right of the decimal place)_.
	- However, floating point values have a small degree of imprecision: in databases and most programming languages, if you add together the floating point numbers 0.1 and 0.2, you don’t get 0.3 — instead, you get something closely approximating that (typically, something like 0.30000000000000004). While that’s _almost_ the same as 0.3, a logical condition like `WHERE num <= 0.3` would fail for that number.
	- This isn’t a bug in PostgreSQL. It’s just a side-effect of the way computers store floating point numbers and the differences in binary representation (what computers use) and human representation in tens. In tens numbers, the number 1/3 (one third) can’t be written directly in digits: we tend to write 0.3333333333333 for it, but that’s _close to_ 1/3rd, but not exactly so. Computer floating point math, though, can accurately hold that exact value in memory. So there are different values that are easier or harder to represent in different systems.
	- To get around this, relational databases tend to offer a NUMERIC type where you give it a fixed precision, like NUMERIC(10,2). This can store a 10-digit number perfectly, with exactly two perfectly-accurate decimal places to the right. This is a good choice for storing monetary amounts, because those often require fixed, perfect-precision. The downside of this type is that it’s slower for computation that floating point numbers, but the fixed precision usually makes that a good trade-off.
	- Some programming language have these kind of numbers, too, including Python, which has a Decimal type with the same properties.
	- **The TL;DR:** use `NUMERIC(10,2)` for currency amounts and it will work as expected.
	- This occurs because computers are written in binary/ base2, and our numbers are in base10
- ~ The Idea of A Timestamp Versus a Point in Time
	- Timestamp is good for the “idea of a date and time”, like “Trick-or-Treating Start Time All Over World in 2020” could be October 31, 2020 at 6:00pm. Of course, the actual point in time when it’s 6pm in Paris is different than when it’s 6pm in Mumbai. When you want to store an actual point in time, you can use Timestamp with time zone and provide a time zone, so you can know “when that timestamp actually _is_”.
- ~ Serials
	- Serials are _never_ reused for the same table — even if that record is deleted, or even if on inserting, an error happened. Therefore, the highest serial can be higher than the number of items in a table, and there can be gaps between serial numbers. All that is guaranteed are that they are unique.

### Common Type Choices

-   Amount of money:
    -   *NUMERIC(10, 2)* or *INT* — but not FLOAT
-   Title of book:
    -   *TEXT*or *VARCHAR(50)* if you want to limit size
-   Zip code:
    -   *VARCHAR(5)* (or 9 for ZIP+4) — they’re not really numbers
-   Meeting start time:
    -   *TIMESTAMP WITH TIME ZONE*

### NULL

- NULL is a special value in SQL for _unknown_.
- NULL values are ok when you might have missing/unknown data
- But generally, they’re a pain, so it’s good to make columns NOT NULL

### Default Values

- A column can be given a default value:
```sql
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,  -- actually make INT with a default
  amt NUMERIC(10,2) NOT NULL,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP),
  notes TEXT NOT NULL DEFAULT '');
```

### Primary Keys

- Every table should have a _primary key_, a unique way to identify records
-   Primary keys _must be_:
    -   Unique
    -   Not Null
-   Primary keys _should be_:
    -   Unchanging 
        - *(it’s a pain when primary keys change, and primary keys often ‘leak out’ of databases)*

### Choosing Primary Keys
![[ddl-schema-design-1678829941683.jpeg]]
-   If there’s a unique stable identifier in the real world, use it
    -   country codes for countries or taxpayer id numbers for companies
-   If the company has an internal code that’s unique and stable, use it
    -   Offices often have a room code for every office in buildings
-   If the “real name” is unique and stable, might be ok to use
    -   “JavaScript” and “Python” are fine PKs in a table of languages
-   If there isn’t a good choice: use a SERIAL (auto-incrementing int)

#### Examples Primary Keys

- Since PKs should be stable, email is a bad choice for user tables.
	- But: people don’t like remembering username, and like logging in by email
- Common solution: use a SERIAL for the PK & make email address unique
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
  -- other things );
```
- You can use the id in relationships and still let users log in by email or change the email

### Constraints

- Constraints are a basic form of validation.  
	- The database can prevent basic types of unintended behavior.
-   *PRIMARY KEY* (every table must have a unique identifier)
	- % Note: there can be a composite *PRIMARY KEY* that is made up of 2+ things, but it still is just 1 *PRIMARY KEY*
-   *NOT NULL* (prevent null in the column)
-   *FOREIGN KEY* (column values must reference values in another table)
-   *UNIQUE* (prevent duplicates in the column)
-   *CHECK* (check a condition before inserting / updating)

```SQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  acct_bal NUMERIC(15,2) CHECK (acct_bal >= 0),
  country_code VARCHAR(2) REFERENCES countries);
```

- Constraints can apply over multiple columns:
```SQL
CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name NOT NULL TEXT,
  last_name NOT NULL TEXT,
  born DATE NOT NULL,
  died DATE,

  UNIQUE(first_name, last_name, born),
  CHECK(born < died)
);
```

- *CHECK* conditions fail if the result expression is false 
	- — if it is true or *null*, it will succeed (assuming no other constraints come into play)

### Column Manipulation

- Adding / Removing / Renaming columns
```SQL
ALTER TABLE books ADD COLUMN in_paperback BOOLEAN;

ALTER TABLE books DROP COLUMN in_paperback;

ALTER TABLE books RENAME COLUMN page_count TO num_pages;
```

- % Note: Controlling Delete Behavior with DDL
	- Normally, you wouldn’t be able to delete a studio that has related movies: _referential integrity_ prevents that. In order to delete the Disney studio, you’d need to make sure that there are no movies referencing that studio. (You could do that by either deleting those movies or changing the studio\_id to another studio or to NULL \[if that field can be null\]).
	- In some cases, you may want the database to do that for you automatically:
```SQL
CREATE TABLE movies (
  -- ...
  studio_id INT
    REFERENCES studios
      ON DELETE SET NULL);
```
- Deleting a studio sets related movies’ studio\_id to null
```SQL
CREATE TABLE movies (
  // ...
  studio_id INT NOT NULL
    REFERENCES studios
      ON DELETE CASCADE);
```
- Deleting a studio deletes related movies first
- However, it’s often a good choice to keep the default — if someone really wants to delete a studio, this will force them to fix/delete movies first themselves, preventing casual accidental deletes.

## Structuring Relational Data

### Movies Database

![[ddl-schema-design-1678806509731.jpeg]]
-   one studio has many movies
-   one actor has many movies
-   one movie has many actors
![[ddl-schema-design-1678806559048.jpeg]]

```SQL
CREATE TABLE studios (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  founded_in DATE NOT NULL);
```

```SQL
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT NOT NULL,
  runtime INT NOT NULL,
  rating TEXT NOT NULL
    CHECK (rating IN
       ('G', 'PG', 'PG-13', 'R', 'NC-17')),
  studio_id INT NOT NULL REFERENCES studios,
  UNIQUE (title, release_year));
```

### Many-to-Many DDL

![[ddl-schema-design-1678806625824.jpeg]]

![[ddl-schema-design-1678806685411.jpeg]]

- This would let an actor have multiple roles in the same movie:
```SQL
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movies,
  actor_id INT REFERENCES actors);
```

- If you want to prevent that:
```SQL
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  movie_id NOT NULL INT REFERENCES movies,
  actor_id NOT NULL INT REFERENCES actors,

  UNIQUE(movie_id, actor_id));

```

## Best Practices

### Normalization

- Normalization is a database design technique which organizes tables in a manner that reduces redundancy and dependency of data.
- It divides larger tables to smaller tables and links them using relationships.
- & For every idea, you want to have a table – every *entity* has it’s own table
- & Every field should be **scalar**
	- **scalar** in programming world = single-valued
- Typically, with Normalization issues, the answer is:
	- *Make another table*
- *Each column should depend on the key, nothing but the key, so help me Codd* (inventor of theoretical basis of relational databases)

### Normalization Example

- !! BAD: The color column is multivalued string (not **scalar**), making it hard to query:
![[ddl-schema-design-1678807149067.jpeg]]

- $ NORMALIZED: 
![[ddl-schema-design-1678807214678.jpeg]]
- Colors is it’s own table because:
	- Allows you to validate colors entered under products_colors (e.g. if there was a typo ‘gren’, you could catch this by checking your colors table)
	- You may want to use colors for more than just products
	- There are likely other things about the color (e.g. Where do you keep the red paint? Quanitity in stock, etc.)
- % Note: In this case color name is the *PRIMARY KEY*  because in this example, the color is distinct enough. If however, you were at a lipstick company and the same color may be called a different name next seasion, would want to have a different *PRIMARY KEY*. 

### Another Example

- !! BAD: Do you see the dependency, where one value already tells us another value?
	- store_city is fully dependent on store_id.
	- The store_city is about the store, not about the purchase.
	- This fact is not dependent on the key, it’s dependent on another column that is then dependent on the key. 
![[ddl-schema-design-1678807306998.jpeg]]

- $ NORMALIZED:
![[ddl-schema-design-1678807337781.jpeg]]

### Design Wrap Up

- Designing complex data is a process requiring experience and thought.
- You’ll get better at it with practice.