DROP DATABASE IF EXISTS messagely;
CREATE DATABASE messagely;

\c messagely

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO users
(username, password, first_name, last_name, phone, join_at, last_login_at)
VALUES
('user1', 'pword1', 'test_fname1', 'test_lname1', '555-555-5555', '2009-07-15 08:00:00 -08:00', '2009-07-15 08:00:00 -08:00'),
('user2', 'pword2', 'test_fname2', 'test_lname2', '555-555-5556', '2009-07-15 08:00:00 -08:00', '2009-07-15 08:00:00 -08:00');

INSERT INTO messages
(from_username, to_username, body, sent_at, read_at)
VALUES
('user1', 'user2', 'test_msg_1', '2009-07-15 08:00:00 -08:00', '2009-07-15 08:10:00 -08:00');