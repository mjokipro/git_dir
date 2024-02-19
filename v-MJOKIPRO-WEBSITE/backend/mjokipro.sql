-- psql < mjokipro.sql

-- DROP DATABASE IF EXISTS mjokipro;
-- CREATE DATABASE mjokipro;

-- \c mjokipro 

DROP DATABASE IF EXISTS mjokipro_test;
CREATE DATABASE mjokipro_test;

\c mjokipro_test

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE websites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    title TEXT NOT NULL,
    web_url TEXT NOT NULL,
    description TEXT
);

CREATE TABLE websites_skills (
  id SERIAL PRIMARY KEY,
    web_id INTEGER REFERENCES websites ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills ON DELETE CASCADE
);

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO skills (name)
VALUES ('Web Development'), ('Backend Development'), ('Frontend Development'), ('Test-Driven Development'), ('Full-Stack Development'), ('Javascript'), ('Python - Flask'),
('SQLAlchemy'), ('Postgresql'), ('React'), ('Node - Express.js');

INSERT INTO websites (user_id, title, web_url, description)
VALUES (1, 'Warbler { twitter clone }', 'https://warb.onrender.com/', '- Full-featured RESTful Twitter clone, implementing full CRUD and 12-bit hashed-based user authentication, and implemented using test-driven development using Python/Flask, bcrypt, Jinja2, and SQLAlchemy.

- Demonstrates use of session storage and environmental state to handle logged in user "g", as well as full featured front-end views using Jinja2 templates.

- Full featured CRUD backend API connects Python/Flask backend to a live Postgresql database, and the entire project is hosted Render.com.
'),

(1, 'Jobly { linkedin clone }', 'https://jobly-mjokipro-li.surge.sh/', '- Full-featured RESTful LinkedIn clone, implementing full CRUD, 12-bit hashed-based user authentication, and designed using test-driven development in Node/Express.js, ReactJS, and SQL.

- Demonstrates secure login/signup (12-bit hash), and use of local storage and environmental state to handle user login, and keep current user logged in, even if the browser window closes.

- Full featured CRUD backend API using ExpressJS, featuring verification middleware and admin access privileges for adding/updating/removing company elements.

- Implementing a live Postgresql database, the Express.JS backend API is hosted on Render.com, and the React.JS frontend is hosted by Surge.- Full-featured RESTful LinkedIn clone, implementing full CRUD, 12-bit hashed-based user authentication, and designed using test-driven development in Node/Express.js, ReactJS, and SQL. - Demonstrates secure login/signup (12-bit hash), and use of local storage and environmental state to handle user login, and keep current user logged in, even if the browser window closes. - Full featured CRUD backend API using ExpressJS, featuring verification middleware and admin access privileges for adding/updating/removing company elements. - Implementing a live Postgresql database, the Express.JS backend API is hosted on Render.com, and the React.JS frontend is hosted by Surge.'),

(1, 'Redcube { netflix clone }', 'https://mjokipro--redcube.surge.sh/login', '- Have a look at the newest selection of downloadable content now available on Redcube! This is essentially a Netflix clone that demonstrates real-world business applications. 

- Full-featured RESTful Redbox clone, implementing partial CRUD, 12-bit hashed-based user authentication, and designed using test-driven development in Node/Express.js, ReactJS, Postgresql.

- Demonstrates secure login/signup (12-bit hash), and use of local storage and environmental state to handle user login, and keep current user logged in, even if the browser window closes.

- Full featured CRUD backend API using ExpressJS, featuring verification middleware and admin access privileges for adding/updating/removing company elements.

- Implementing a live Postgresql database, the Express.JS backend API is hosted on Render.com, and the React.JS frontend is hosted by Surge.- Have a look at the newest selection of downloadable content now available on Redcube! This is essentially a Netflix clone that demonstrates real-world business applications. - Full-featured RESTful Redbox clone, implementing partial CRUD, 12-bit hashed-based user authentication, and designed using test-driven development in Node/Express.js, ReactJS, Postgresql. - Demonstrates secure login/signup (12-bit hash), and use of local storage and environmental state to handle user login, and keep current user logged in, even if the browser window closes. - Full featured CRUD backend API using ExpressJS, featuring verification middleware and admin access privileges for adding/updating/removing company elements. - Implementing a live Postgresql database, the Express.JS backend API is hosted on Render.com, and the React.JS frontend is hosted by Surge.'),

(1, 'Edify.com { python style }', 'https://edify-python.onrender.com', '- The main drive behind this project was a yearning to serve the Lord Jesus Christ, and it attempts to show the skill that He has blessed me with.  It is only a model, and it was developed using Python and Jinja2 templating.  

- Please be patient, as there are styling issues that are causing some of the views to look... a little weird, but REST assured, the functionality works as it should, and it displays the use of scripture lookup, secure login, messaging, user search, and user profile editing / deleting.

- Full-featured RESTful social media platform, implementing full CRUD and 12-bit hashed-based user authentication, and implemented using test-driven development using Python/Flask, bcrypt, Jinja2, and SQLAlchemy.

Other features include:  

-  Functionality for adding and updating employees, users, departments and projects.

-  Personalized styled themes and components, interactive user search capability in navbar, and secure signup and login forms.

- Full featured CRUD frontend and backend API using Python/Flask, a live Postgresql database, and production ready hosting on Render.com.

- Demonstrates use of session storage and environmental state to handle logged in user "g", as well as full featured front-end views using Jinja2 templates.');


INSERT INTO websites_skills (web_id, skill_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), 
(2, 1),
(3, 1), 
(4, 1);