### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL? an ORM program that allows us to create and use sql in an object oriented way.  It uses models that represent sql databases.

- What is the difference between SQL and PostgreSQL?  postgres allows us all the functionallity of sql, plus some internal functionallity.

- In `psql`, how do you connect to a database? \c database_name

- What is the difference between `HAVING` and `WHERE`? HAVING can be used with aggregates; WHERE cannot. 

- What is the difference between an `INNER` and `OUTER` join? INNER (default) join only returns records where all fields are in common (occupied).  OUTER join allows us to render some or no info for a given relationship.  INNER = intersect, OUTER = union.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join? left outer pulls all recs from left table in schema, and it matches with all info in right table, even if null.  Right outer is opposite of left outer.

- What is an ORM? What do they do?  refer to question 1...

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?  Using AJAX on the front end can be faster, like if going to google maps, but it is less secure than from the backend, because server side can handle alot of the security and db stuff.

- What is CSRF? What is the purpose of the CSRF token?  Cross Site Request Forgery; is is a security that prevents form submission to any other intended site, but the one that is intended, using the token to match form fields upon post.

- What is the purpose of `form.hidden_tag()`?  It is sent with form data to server, and if it matches, it can proceed to process request.
