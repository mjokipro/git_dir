Make sure you download the starter code and run the following:

```sh
  psql < movies.sql
  psql movies_db
```

In markdown, you can place a code block inside of three backticks (```) followed by the syntax highlighting you want, for example

\```sql

SELECT \* FROM users;

\```

Using the `movies_db` database, write the correct SQL queries for each of these tasks:

1.  The title of every movie.
2.  \"""sql
3.  SELECT title FROM movies;
    \"""

4.  All information on the G-rated movies.
5.  \"""sql
6.  SELECT \* FROM movies WHERE rating LIKE 'G';
    \"""

7.  The title and release year of every movie, ordered with the
    oldest movie first.
8.  \"""sql
9.  SELECT title, release_year FROM movies WHERE rating LIKE 'G' ORDER BY DESCENDING;
    \"""
    
10. All information on the 5 longest movies.
11. \"""sql
12. select \* from movies order by runtime desc limit 5; 
    \"""

13. A query that returns the columns of `rating` and `total`, tabulating the
    total number of G, PG, PG-13, and R-rated movies.
14. \"""sql
15. select rating, count(\*) as total from movies group by rating;
    \"""

16. A table with columns of `release_year` and `average_runtime`,
    tabulating the average runtime by year for every movie in the database. The data should be in reverse chronological order (i.e. the most recent year should be first).
17. \"""sql
18. select release_year, avg(runtime) as average_runtime from movies group by release_year;
    \"""

19. The movie title and studio name for every movie in the
    database.
20. \"""sql
21. select title, name from movies join studios on movies.studio_id = studios.id;
    \"""

22. The star first name, star last name, and movie title for every
    matching movie and star pair in the database.
23. \"""sql
  select m.title, a.first_name, a.last_name from movies m join roles r on m.id = r.movie_id join stars a on r.star_id = a.id;
    \"""

24. The first and last names of every star who has been in a G-rated movie. The first and last name should appear only once for each star, even if they are in several G-rated movies. *IMPORTANT NOTE*: it's possible that there can be two *different* actors with the same name, so make sure your solution accounts for that.
25. \"""sql
select m.title, a.first_name, a.last_name from movies m join roles r on m.id = r.movie_id join stars a on r.star_id = a.id where m.rating like 'G';
    \"""

1.  The first and last names of every star along with the number
    of movies they have been in, in descending order by the number of movies. (Similar to #9, make sure
    that two different actors with the same name are considered separately).
2.  \"""sql
select a.id, a.first_name, a.last_name from movies m join roles r on m.id = r.movie_id join stars a on r.star_id = a.id group by a.id, a.first_name, a.last_name having count(\*) >= 2  order by count(*) desc;
    \"""

### The rest of these are bonuses

11. The title of every movie along with the number of stars in
    that movie, in descending order by the number of stars.

12. The first name, last name, and average runtime of the five
    stars whose movies have the longest average.

13. The first name, last name, and average runtime of the five
    stars whose movies have the longest average, among stars who have more than one movie in the database.

14. The titles of all movies that don't feature any stars in our
    database.

15. The first and last names of all stars that don't appear in any movies in our database.

16. The first names, last names, and titles corresponding to every
    role in the database, along with every movie title that doesn't have a star, and the first and last names of every star not in a movie.
