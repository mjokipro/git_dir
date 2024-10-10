
## Intro

-   Learn getting data with SELECT
-   Learn insertion, updating, and deletion
-   Learn about transactions

## SQL

- SQL language was written in 1970s, and has persisted even though other languages have tried to replace.
- 90% of querying uses SQL

![[sql-querying-1678718233030.jpeg]]
```sql
SELECT title, pub_date FROM posts WHERE author = 'Matt';
```

- & Commands can go over several lines, but *must end with a semicolon*
-   Strings in SQL:
    -   *case-sensitive*: `'Matt'` not same as `'matt'`
    -   *single-quotes ONLY* not double quotes, around strings.
        - Double quotes mean something very different
-   Keywords conventionally written in ALL CAPS but functionally are case-insensitive
```
SELECT author FROM posts` same as `select author from posts`
```

### Types of SQL Statements

- **DML: Data Manipulation Language**
	- The commands to create, read, modify, or delete records:
	- These are commands about *data*
	- Examples: *SELECT*, *INSERT*, *UPDATE*, *DELETE*

- **DDL: Data Definition Language**
	- The commands to create and delete tables and modify schemas:
	- These define the *schema*
	- Examples: *CREATE*, *ALTER*, *DROP*

### Data Manipulation Language

- Most of the DML you’ll be doing will be related to **CRUD** operations on rows.
| Letter | Verb | SQL Commands |
| --- | --- | --- |
| **C** | Create | `INSERT INTO table` |
| **R** | Read | `SELECT ... FROM table ...` |
| **U** | Update | `UPDATE table SET ...` |
| **D** | Delete | `DELETE FROM table ...` |

## SELECT

- *SELECT* is the most flexible and powerful command in SQL
	- It selects data (included summary data, roll-up data, etc) from table(s)
	- <u>Many</u> different  options can be used with *SELECT*
	- *SELECT doesn’t change data*
- *SELECT* statements have subclauses, which are _performed_ in this order:
	- Reads your statement in this order BUT you write it slightly differently
		- & You have to put the *SELECT* statement first, then write the rest of the statements *in order*
		- & Can only have 1 of each clause
- Separate with commas, the columns you want in your result

| # | Clause | Purpose | Required? |
| --- | --- | --- | --- |
| 1 | FROM | Select and join together tables where data is | — |
| 2 | WHERE | Decide which rows to use | — |
| 3 | GROUP BY | Place rows into groups | — |
| 4 | HAVING | Determine which grouped results to keep | — |
| 5 | SELECT | Determine values of result | ![✅](https://twemoji.maxcdn.com/v/14.0.2/svg/2705.svg) |
| 6 | ORDER BY | Sort output data | — |
| 7 | LIMIT | Limit output to _n_ rows | — |
| 8 | OFFSET | Skip _n_ rows at start of output | — |

- & All select statements start with SELECT.
```sql
SELECT 'math is fun', 2 * 3;
```
- That’s not very interesting, though, until we get data from tables!

### FROM

- Determine which table(s) to use to get data:

title/author/pub\_date from all records in posts
```sql
SELECT title, author, pub_date
  FROM posts;
```
- @ Stylistic nicety: 
	- Separate on new lines

- You can get data from multiples tables by _joining_ them — we’ll discuss this later
- You can get all columns by using `*`
	- `*` best for playing around in the database yourself
	- !! Don’t use the `*`  when writing actual code (in python, etc.) — this might return sensitive data!
		- Even if not returning sensitive data now, could do so in future with someone else’s updates

all columns from all records in posts- fine when playing around
```sql
SELECT *
  FROM posts;
```

### WHERE

- Filter result rows on a condition:
	- *Filters out records*

only posts >= May 1st
```sql
SELECT *
  FROM posts
  WHERE pub_date >= '2020-05-01';
```

#### ILIKE

- Match to text
	- type of filter

matches ‘Jessica’ anywhere in column 
```sql
SELECT id,
	   first_name AS "firstName",
	   last_name  AS "lastName",
	   phone,
	   notes
    FROM customers
    WHERE last_name ILIKE '%Jessica%' OR first_name ILIKE '%Jessica%'
	ORDER BY last_name, first_name;
```

### GROUP BY

- Reduce the amount of rows returned by grouping rows together
- ! When using *GROUP BY*: think carefully about what you are grouping by
	- Names = not good to group by b/c people can have the same names
		- Instead, *GROUP BY* id
			- Then, after id, you may need to also group by name if you are selecting name in your query
- 

group by author: each author shows up once
```sql
SELECT author
  FROM posts
  GROUP BY author;
```
“make a little bucket for each author”

group by author: name & num posts
```sql
SELECT author, COUNT(*)
  FROM posts
  GROUP BY author;
```
![[sql-querying-1678741937231.jpeg|350]]

group by
```sql
SELECT author, COUNT(*), MIN(pub_date), MAX(pub_date) FROM posts GROUP BY author;
```
![[sql-querying-1678742120583.jpeg]]

### WHERE and GROUP BY

- & Remember, WHERE happens first, so it filters _before_ we group:

group by author: name & num posts
```sql
SELECT author, COUNT(*)
  FROM posts
  WHERE pub_date >= '2020-05-01'
  GROUP BY author;
```

- ! When *grouping*, cannot ask for a single item *unless:*
	- That item is in *aggregate function*
	- That is the item you are *grouping by*
	- For example: in above code, could *not* ask for title in addition to author

### HAVING

- Decide which group(s), if grouped, to keep:
	- *Filters out GROUPS*, Post grouping
	- Must ask one of the aggregate fx for this, not just an individual thing.

only show groups with more than 1 post
```sql
SELECT author, COUNT(*)
  FROM posts
  GROUP BY author
  HAVING COUNT(*) > 1;
```

- & You can’t use *HAVING* without *GROUP BY*

### SELECT

- *This* is where the SELECT clause is used (even though you write it first)
- The select clause can have `*`, column names, or even SQL functions or expressions:
	- Function called *age* (example below): tell me how old this is
	- Function called *extract*

get title and time-since-published
```sql
SELECT title, age(pub_date)
  FROM posts;
```

- For a products table, you could calculate and show a sale price:

show title and 50% off price
```sql
SELECT product_name, price / 2 AS sale_price
  FROM products;
```

- To give a row column a name, use **AS** last with the name you want to give.
	- **AS** modifies the name, doesn’t change the data, just makes it easier to read

### ORDER BY

- Sort rows before returning:

order results by author name (A → Z)
```sql
SELECT *
  FROM posts
  ORDER BY author;
```

- & If you don’t provide an ORDER BY clause, the returned row order is not predictable.
	- *NOT* guaranteed to be the post-id, though it might look that way. Database will just return whatever order is easiest for it.

- You can provide multiple expressions to sort on:

order results by author name, within that, date:
```sql
SELECT *
FROM posts
ORDER BY author, pub_date;
```

- If you want to sort descending, put the word *DESC* after any sort expression to invert that sort (default is ascending order): 
  `ORDER BY author DESC, pub_date` 
  returns rows first sorted by author name, in Z → A order, and within that, by publication date sorted oldest to newest.

example of complex ORDER BY
```sql
SELECT winner, subject
  FROM nobel
  WHERE yr = 1984
  ORDER BY
    subject IN ('Chemistry', 'Physics'),
    subject,
    winner;
```

### LIMIT

- Only show _n_ number of rows
- & It only makes sense to use *LIMIT* if you have an *ORDER BY* clause.
	- LIMIT cuts off after this number, so if the data isn’t sorted, data shown is just an arbitrary number that would change each time. 

only show first 5 rows
```sql
SELECT *
  FROM posts
  ORDER BY pub_date
  LIMIT 3;
```

### OFFSET

- Skip _n_ number of rows.
	- default is 0

skip first row
```sql
SELECT *
  FROM posts
  ORDER BY pub_date
  OFFSET 1;
```

- Often used with *LIMIT* to paginate results:
	- See X number of results per page, then when you click next page, you see the next X number of results, etc.
	- Just make sure you also use *ORDER BY*

get “next batch of 3”
```sql
SELECT *
  FROM posts
  ORDER BY pub_date
  LIMIT 3
  OFFSET 3;
```

class example:
![[sql-querying-1678744287862.jpeg]]

## SQL Operators

- Operators are used to build more complicated queries. They are reserved SQL keywords or symbols:
	- Common ones: *IN*, *NOT IN*, *BETWEEN*, *AND*, *OR,* *NOT*, mult `*`,  */* divide, etc.
		-  *=*  Check for equality
		- *< >* Check for inequality

get posts if `>=5/1` or by Zach:
```sql
SELECT * FROM posts WHERE author='Zach' OR pub_date >= '2020-05-01';
```

get posts if `>=5/1` and by Zach:
```sql
SELECT * FROM posts WHERE author='Zach' AND pub_date >= '2020-05-01';
```

get posts where post id is in a list
```sql
SELECT * FROM posts WHERE post_id IN (1, 3, 4, 5);
```

get posts between `4/1` and `4/30` (inclusive)
```sql
SELECT *
  FROM posts
  WHERE pub_date BETWEEN '2020-04-01' AND '2020-04-30';
```

## SQL Aggregates

- Aggregates are used to combine records together to extract data: 
	- *What would you ask of a group?* 
	- Common aggregate functions include *COUNT*, *AVG*, *SUM*, *MIN*, and *MAX*
- Can use aggregate functions for Stats functions as well
- % Note: 
	- If you leave out *GROUP BY* everything is grouped by 1 (in its own group)

count of posts
```sql
SELECT COUNT(*) FROM posts;   -- Count(*) is num of things in this bucket
```

count posts by Zach
```sql
SELECT COUNT(*) FROM posts WHERE author = 'Zach';
```

get most recent post date
```sql
SELECT MAX(pub_date) FROM posts;
```

sum of all likes
```sql
SELECT SUM(num_likes) FROM posts;
```

average (mean) number of likes
```sql
SELECT AVG(num_likes) FROM posts;
```

### GROUP BY

- The *GROUP BY* and *HAVING* clauses are often used with aggregate functions

count of posts
```sql
SELECT author, COUNT(*)
  FROM posts
  GROUP BY author;
```

count, by author, of recent posts
```sql
SELECT author, COUNT(*)
  FROM posts
  WHERE pub_date >= '2020-05-01'
  GROUP BY author;
```

only show groups with more than 1 post
```sql
SELECT author, COUNT(*)
  FROM posts
  GROUP BY author
  HAVING COUNT(*) > 1;
```

## NULL

- & NULL is a special value that means _unknown_
	- & NULL is very different from Python’s None and JavaScript’s null
- The schema for the table controls which columns can allow NULL values
- Designers tend to mark columns as NOT NULL if they know there will data

### SQL NULL vs Python None

- Python’s None is concrete, None == None, so it doesn’t really mean ‘unknown’ in Python

- Let’s say there are two people who we don’t know how much they paid in taxes:
```python
donald = None
ivanka = None
```

- We can check if donald is equal to None or a known number:
```python
donald == None   # True
donald == 10     # False --- but how do we know that? donald's taxes could be $10...
```

- Python raises an error if we use None in an inequality check:
```python
donald > 100   # TypeError: can't compare int and None
```

- Python treats both “unknown values” as the same
```python
donald == ivanka   # True, even though we don't know that donald's taxes = ivanka's taxes
```

### SQL NULL vs JavaScript null

- JS’ null is wacky:

- Same setup:
```js
let donald = null;
let ivanka = null;
```

- We can check if donald is equal to null or a known number:
```js
donald === null;   // true
donald === 10;     // false -- but how do we know that?
```

- JavaScript just assumes null is less than any number:
	- But this doesn’t really make sense, if null is ‘unknown’
```js

donald > 100;   // false -- but do we really know that donald's taxes are not greater than 100?

donald + 3 === 3 // True -- Because null + 3 = 3.   This is WACK.
```

- JavaScript also treats both “unknown values” as the same
```js
donald === ivanka;   // true, even though we don't know that these are equal
```

### SQL NULL

- In SQL, it’s very rigorously logical - and follows 3 way logic:
	- True, False, Unknown(Null)

```sql
SELECT donald = 10;   -- NULL, we don't know!
```

```sql
SELECT donald > 100;   -- NULL, we don't know!
```

```sql
SELECT donald = ivanka;   -- NULL, we don't know!
```

```sql
SELECT donald = null;   -- NULL; they are different unknowns
```

- & Comparing _anything_ to a NULL value returns NULL:
```sql
SELECT NULL = NULL;  -- NULL: different unknowns!
```

- Therefore, to check if something is NULL, write it like:
```sql
SELECT NULL IS NULL;  -- gives true or false
```

- ! Be careful! What’s the problem with these two queries?:
find new posts?
```sql
SELECT *
  FROM posts
  WHERE pub_date >= '2020-05-01';
```

find old posts?
```sql
SELECT *
  FROM posts
  WHERE pub_date < '2020-05-01';
```
- ! Neither finds non-published posts! Because this value is Null

find new posts PLUS unpublished
```sql
SELECT *
  FROM posts
  WHERE pub_date >= '2020-05-01' OR pub_date IS NULL;
```

- & NULL values are tricky and sometimes a pain. Be careful with them.

- @ NULL and text fields
	- The same kind of logic applies with text fields. Imagine a table with fields for first, middle, and last names. If middle names are left NULL for some people, an expression like:
	  ` fname || ‘ ‘ mname || ‘ ‘ || lname `
	   won’t work—*since mname is NULL, the entire expression can only evaluate to NULL*.
	- SQL includes a *coalesce* function: it takes several arguments and returns the first non-NULL argument. We could instead write our name problem as:
	   `fname || coalesce(mname || ‘ ‘, ‘’) || lname`
	- While it’s not part of the SQL standard, PostgreSQL includs an easier function, `concat_ws`. This is used to join together many arguments with a separator string, ignoring any nulls. We could write the above as:
	   `concat\_ws(’ ‘, fname, mname, lname)`
	- You can learn about other string functions at [String Functions and Operators](https://www.postgresql.org/docs/current/functions-string.html).

## Modifying Data

### Creating data with INSERT

- Any data you Insert but don’t explicitly give a value to becomes:
	- Default value if present, or Null

insert new post
```sql
INSERT INTO posts (title, author)
  VALUES ('Why We Teach Node', 'Elie');
```

can insert multiple records at once
```sql
INSERT INTO posts (title, author) VALUES
  ('Why We Teach Python', 'Matt'),
  ('Debugging in Chrome', 'Nate');

```

- ~ Tip: INSERT via SELECT
	- You can combine INSERT and SELECT to copy data from another table.
```sql
INSERT INTO posts (title, author)
  SELECT title, author
  FROM some_other_table;
```

### Updating Data with UPDATE

Matt is a prolific writer
```sql
UPDATE posts SET author = 'Matt';  -- Sets all Posts to have author of 'Matt'
```

Not that prolific!
```sql
-- Finds post, updates that one to 'Matt':
UPDATE posts SET author = 'Matt' WHERE post_id = 2;
```

### Deleting Data with DELETE

delete a post
```sql
DELETE FROM posts WHERE post_id = 3;
```

delete unpublished posts
```sql
DELETE FROM posts WHERE pub_date IS NULL;
```

delete all posts
```sql
DELETE FROM posts;
```

## Transactions

- SQL statements run independently and commit changes immediately.
	- Instead, better to work in a _transaction_
- **Transaction**:
	- *When important that everything succeeds or nothing happens*
	- Like a little “safety box” : If you want to try 2+ things - like charge credit card and ship book, but if one of those fails, nothing should happen. (i.e. would be bad to charge card and never send book)
	- Changes made in a transaction are limited to that transaction; they are not saved for others *until you commit them*.
	- These are good for:
		-   Rolling back from accidental deletions/updates
		-   Ensuring operation is _atomic_ 
			- *Actions that cannot be divided*

### Working in a Transaction

- Start a transaction with the command *BEGIN*:
```
BEGIN;
DELETE FROM posts;

-- within this transaction, you query:
SELECT COUNT(*) FROM posts;    -- finds none!

-- (other connections to the database still see them)
```

- To commit changes, use *COMMIT*:
```
COMMIT;
-- commits and closes transaction, now everyone has noå posts
```

- If you did something you don’t want, or had an error, *ROLLBACK*:
```
ROLLBACK;
-- closes transaction without committing
```

- ~ Tip: Fouled Transactions
	- If you have any kind of error in a transaction, it is _fouled_ — no further SQL statements can succeed. ROLLBACK the transaction (and *then open a new one if still want to be in a transaction*) and start over.
- % Note: Version Control
	- With multiple people working on the same database, there are different ways of handling version control. Some general philosphy categories:
		- Optimistic Locking: Allows folks to edit same thing at same time. Expects that there won’t be conflicting changes, last commit overrules/wins by default.
		- Pessimistic Locking: Locks table whenever someone opens it to edit, No others can work on that table, or that table area
		- Throwing errors: Allow folks to edit same thing at same time, but throw an error if there are conflicts.