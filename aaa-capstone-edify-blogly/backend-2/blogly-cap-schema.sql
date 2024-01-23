-- DROP DATABASE blogly_cap;
-- CREATE DATABASE blogly_cap;
-- \connect blogly_cap

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  logo_url TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users,
    created_at DATE
);

CREATE TABLE posts_tags
(
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags ON DELETE CASCADE
    -- PRIMARY KEY (post_id, tag_name)
);

-- INSERT INTO users (username, password, first_name, last_name, email, logo_url, is_admin)
-- VALUES ('testuser',
--         '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
--         'Test',
--         'User',
--         'joel@joelburton.com',
--         'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
--         FALSE),
--        ('testadmin',
--         '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
--         'Test',
--         'Admin!',
--         'joel@joelburton.com',
--         'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
--         TRUE);

-- INSERT INTO tags
--     (name)
-- VALUES
--     ('happy'), ('saved'), ('justified');

-- INSERT INTO posts
--     (title, content, user_id)
-- VALUES
--     ('Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!', 1),
--     ('The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.', 2),
--     ('God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.', 1),
--     ('God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.', 2);

-- INSERT INTO posts_tags
--     (post_id, tag_id)
-- VALUES
--     (1, 1), (1, 2), (2, 2)       