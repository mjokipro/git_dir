## Intro

-   Introduce database servers and databases
-   Introduce PostgreSQL, the database software we’ll use
-   Learn important concepts about databases & tables

### Database

- A database is a collection of data organized to be efficiently stored, accessed, and managed.
- People often say _database_ to mean any of these:
	-   the vendor _(database vendor)_: Examples include Oracle, PostgresQL, Microsoft’s SQL
	-   server software _(database server software)_
	-   physical computer running that software _(database server)_
	-   a particular collection of data _(database)_: All data about employees, sales, diff “worlds” of data
- % Note: **venv** is a purely python concept: whether or not you are in a venv has nothing to do with a database

### Databases in the Web Stack

- A typical web stack is a client, server, and database.
![[intro-databases-1678716401987.jpeg|625]]
- Front end talks to server, server talks to database, database gives response to server
- & Front end does NOT talk to database directly
	- Security risk, and most places just couldn’t do it

### Relational Databases

-   Model data as rows and columns of tabular data (like spreadsheets)
-   **RDBMS** - _Relational Database Management System_
    -   There are many _vendors_: PostgreSQL, MySQL, Oracle, Microsoft SQL Server
        - All use SQL, 99% is the same between them
-   **SQL** - _Structured Query Language_ the  *language* for working with **RDBMS**s
    -   SQL is standardized across to different vendors (but not perfectly)
        -   Both _sequel_ and _ess-queue-ell_ are acceptable pronunciations
        - But call PostgresQL: *Postgres-queue-ell*
- **SQL** is a *declarative* language
	- *Tell me what you want, now how it works*
	- CSS another example of declarative language
- This is also contrast to *imperative* languages
	- *Tell me step by step what you want me to do*
	- Javascript, python are imperative languages.

### PostgreSQL

- PostgreSQL is the Open Source RDBMS we’ll use here
	-   Powerful
	-   Popular
	-   Follows the SQL standard closely
- On its website, PostgreSQL describes itself as an ORDBMS, that is, an object relational database management system. However the distinction between these two isn’t important for us. If you’re curious, you can [read about the difference](https://en.wikipedia.org/wiki/Object-relational_database#Comparison_to_RDBMS).
- PostgresQL similar to flask in that both run on a port, listen for info, and run a program in the background on your computer. 

## Databases

-   A _database_ is a collection of tables (& other things)
    -   eg all tables about customers and billing could be in customer database
-   A _database server_ can manage and store *multiple databases*
	- This is unlike flask, where each app, you restart flask
-   Here, we’ll make separate databases for each project we’ll work on
    -  Every excercise, every project, we’ll make new database
    -   But they’ll all be managed by the same server

### Creating a Database

- *CREATE DATABASE* command
```terminal
  $ psql
  =# CREATE DATABASE my_database_name;
  =# (control-d)
```

- & Database names should be lowercase _snake\_case_ — otherwise, there will be challenges later in using it.

### Where Is That Database?

- The database **is not** a file in your current directory, not stored where you are in shell
	- Cannot `cd` into it
	- It’s a bunch of files/folders elsewhere on your computer made for databases
	- These aren’t human-readable _(they’re optimized for speed!)_
- ! Saving your project in Git won’t save your database!

### Listing Databases For Your Server

- `psql -l` : list my databases
```terminal
$ psql -l

       Name      |  Owner
-----------------+----------
 customers       | rithm
 hack_or_snooze  | rithm
 blog            | rithm
```

- psql is the program you’ll use to work with PostgreSQL databases.

### Dropping Databases

- A database that is “dropped” is completely deleted
```terminal
$ dropdb my_database_name
```
- There is no way to undo that without your having kept a copy of it.

## Tables

- *posts table* in our *blog database*:
| post\_id | title | author | pub\_date |
| --- | --- | --- | --- |
| 1 | Tech Worker Reading List for 2020 | Matt | 2020-06-20 |
| 2 | JavaScript in 2020 | Elie | 2020-05-27 |
| 3 | Rithm School Remote FAQs | Tim | 2020-04-01 |
| 4 | Learning a New Language | Joel | 2020-07-21 |
| 5 | Get Good at Coding Challenges | Nate | 2020-03-04 |

-   **table**: like a spreadsheet, a set of columns and rows
    -   In PostgreSQL, these will often be referred to as a _relation_.  *relation* just means table
-   **column**: 
	- e.g. _id_, _title_, _author_, and _pub\_date_
-   **record**: one entry in a table (one horizantal line)
	- e.g. the data for post #1
	- ! Note: DON’T call these rows - to keep records separate from what returns from queries
-   **field**: value at intersection of a column and a record (like a “cell” in a spreadsheet)
	- e.g. “Elie” or “2020-06-20”

### Table Schema

-   A table has the definition of its structure, called a _schema_:
	- & **Schema** is the definition of structure, not the data itself
-   The schema for our posts table:
    -   **id**: auto-incrementing integer number
    -   **title**: text, cannot be left empty
    -   **author**: text, cannot be left empty
    -   **pub\_date**: date, can be left empty
- &  The schema is _not_ the data in a table — it’s the structure of a table

### Seeing a Table Schema

- To see the schema of a table inside that database, use:
	- `\d name_of_table`
	- d stands for describe
	- % Note: this command is run after you are inside a database (have already run psql database_name), in this example, would have already ran `psql blog`
```terminal 
blog=# \d posts

                      Table "public.posts"
  Column  |  Type   | Nullable |              Default
----------+---------+----------+------------------------------
 post_id  | integer | not null | nextval('posts_post_id_seq')
 title    | text    | not null |
 author   | text    | not null |
 pub_date | date    |          |
```

- To quit psql, use Control-D

### Second Table: comments

![[intro-databases-1678717162622.jpeg]]

```terminal
blog=# \d comments

   Column   |  Type   | Nullable |    Default
------------+---------+----------+---------------
 comment_id | integer | not null | nextval(...)
 post_id    | integer | not null |
 comment    | text    | not null |
 username   | text    | not null |
 approved   | boolean | not null | false
```

### Listing All Tables

- `\dt` : describe tables in this database
```terminal
blog=# \dt

         List of relations
 Schema |   Name   | Type  | Owner
--------+----------+-------+-------
 public | comments | table | rithm
 public | posts    | table | rithm

```
- Note: prompt (blog=#) tells you which database you are in

### Managing Tables

- There are SQL commands to add tables, modify schemas, or drop tables but we won’t be talking about this until later

#rithmRefactor

## Table Data

- To list, add, update, or delete data, there are separate SQL commands
- For example, you show data using a command SELECT

### Selecting Data

- *SELECT*  starts a query 
	- A query is just asking a question, which returns back an answer. 
		- That answer is not auto-saved as a new table or anywhere else - though with python, you may make queries and save the results into variables.
```terminal
blog=# SELECT * FROM posts;

post_id |                title              | author |  pub_date
--------+-----------------------------------+--------+-----------
      1 | Tech Worker Reading List for 2020 | Matt   | 2020-06-20
      2 | JavaScript in 2020                | Elie   | 2020-05-27
      3 | Rithm School Remote FAQs          | Tim    | 2020-04-01
      4 | Learning a New Language           | Joel   | 2020-07-21
      5 | Get Good at Coding Challenges     | Nate   | 2020-03-04
(5 rows)
```

- SQL commands must end with a semicolon

### Records and Rows

-   A table has _records_ for every line in the table.
	- *record = what is actually stored in the table*
-   Queries return _rows_, which is a line in the results
	- *row - comes from a query - refers to that line in the answer returned from the query*
- @ Note: 50% time people interchange these terms - however: it is REALLY helpful to keep them separate, particularly for interpreting errors
-   Here’s a query that searches all comment records but returns one row:

```terminal
blog=# SELECT COUNT(*) FROM comments WHERE approved;
 count
-------
     2
(1 row)
```

- A _record_ is data in the table, a _row_ is just a *temporary result line*

## Relationships

- One thing RDBMSs are good at is handling _relationships_ between data:
![[intro-databases-1678717628998.jpeg]]
![[intro-databases-1678717652760.jpeg]]

- Each comment record tells us which post is being commented on

### Joining Tables to Query Across Relationship

- RDBMSs are good at asking questions that span a relationship.
  _For every post with a comment, show me the title, comment, and username_:

![[intro-databases-1678717724377.jpeg]]

```terminal
                title              |      comment     | username
-----------------------------------+------------------+---------
 Tech Worker Reading List for 2020 | Awesome!         | aliya
 JavaScript in 2020                | So helpful       | alex
 JavaScript in 2020                | Buy drugs at ... | bot-135
(3 rows)

```

- Querying and joining is what RDBMSs are designed for, so they’re extremely efficient at doing it well

## psql

- The program psql is a _database console_ program, *specific to PostgreSQL*.
- You use this for: 
	- PostgreSQL-specific commands (all postgresql-specific commands start with `\`) 
	- Non-PostgreSQL-specific SQL commands (all other commands that *don’t* start with `\`).
- You can use GUIs to work with PostgreSQL, but it’s good to learn psql first.

### Common Commands in psql

-   `\l` — List all databases
-   `\c DB_NAME` — connect to _DB\_NAME_
-   `\dt` —- List all tables _(in current db)_
-   `\d TABLE_NAME` — Get details about _TABLE\_NAME_ _(in current db)_
-   `\q` — Quit psql (even easier: Control-D)
-  `\h` — Get help on SQL commands
-   `\?` — Get help on special psql commands

## Exporting / Importing Databases

### Backing Up a Database

- You can make a backup of your database by “dumping it” to a file:
```terminal
$ pg_dump -c -O blog > blog.sql
```
- There are many options of how to do this, this example just chooses common ones
-  This makes a file in the current directory, `blog.sql`
-  It contains commands to recreate the schema and data when needed.
- & To give others starter data for a project, include this in your Git repo.

### Seeding a Database

- You can feed `*.sql` scripts into psql:
```terminal
psql -f blog.sql blog
```
- % Note breakdown of this command:
	- psql -f      Feed into
	- blog.sql   From this filename
	- blog         To this database  
- & Note: the database must exist first.
	- Run the CREATE DATABASE database_name
	- Then run this command

### Exporting Data For Other Programs

- To CSV _(often used by spreadsheets or other programs)_:
	- CSV: comma separated values
```terminal
=# \COPY posts TO 'posts.csv' CSV
```

- To JSON:
```terminal
=# \COPY (SELECT json_agg(posts) FROM posts) TO 'posts.json'
```

- ~ Tip: Starting PostgreSQL After a Crash
	- If your computer crashes and you have to restart it without going through a normal shutdown, you may find that PostgreSQL isn’t running
This error means PostgreSQL’s server isn’t running:
```terminal
$ psql
psql: error: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```
To fix this:
```terminal
$ pg_restart
```

## SQL Prevalance

-   90% of the time, you’ll use **SQL** databases
-   10% of cases, non-relational _(“NoSQL” or Object)_ databases are very useful



