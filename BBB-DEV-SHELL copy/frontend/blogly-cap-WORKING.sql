\psql < blogly-cap-WORKING.sql

DROP DATABASE blogly_ca;
CREATE DATABASE blogly_ca;
\connect blogly_ca

CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
--   join_at timestamp without time zone NOT NULL,
--   last_login_at timestamp with time zone
);

INSERT INTO users 
(username, password, first_name, last_name, email, is_admin)
VALUES ('user1', 'password', 'user', 'user', 'm@m.com', FALSE),
       ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        -- 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        -- 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
        TRUE);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(25) NOT NULL,
    from_user VARCHAR(25) NOT NULL REFERENCES users,
    to_user VARCHAR(25) DEFAULT NULL REFERENCES users,
    title TEXT NOT NULL,
    body TEXT NOT NULL
    -- sent_at timestamp with time zone NOT NULL,
    -- read_at timestamp with time zone
);

INSERT INTO documents
(type, from_user, to_user, title, body)
VALUES
('post', 'user1', NULL, 'test_post_1', 'test_body'),
('message', 'testuser', 'user1', 'test_msg_1', 'test_body'),
('post', 'testuser', NULL, 'test_msg_1', 'Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!'),
('post', 'testuser', NULL , 'test_msg_1', 'God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.'),
('message', 'testuser', 'user1', 'test_msg_1', 'The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.'),
('message', 'testuser', 'user1', 'test_msg_1', 'God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.');

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL
    -- type VARCHAR(3) UNIQUE NOT NULL
);

INSERT INTO tags
    (name)
VALUES
    ('happy'), ('saved'), ('justified');

-- CREATE TABLE posts
-- (
--     id SERIAL PRIMARY KEY,
--     title TEXT NOT NULL,
--     content TEXT NOT NULL,
--     user_id integer REFERENCES users
--     -- created_at DATE
-- );

CREATE TABLE documents_tags
(
    -- id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES documents ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags ON DELETE CASCADE,
    PRIMARY KEY (doc_id, tag_id)
);

INSERT INTO documents_tags
    (post_id, tag_id)
VALUES
    (1, 1), (1, 2), (2, 2)       



-- INSERT INTO posts
--     (title, content, user_id)
-- VALUES
--     ('Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!', 1),
--     ('The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.', 1),
--     ('God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.', 1),
--     ('God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.', 1);
