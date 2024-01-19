-- psql < blogly_db
-- psql blogly_db

DROP DATABASE IF EXISTS blogly_db;

CREATE DATABASE blogly_db;

\c blogly_db

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    image_url TEXT
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users,
    created_at DATE
);

CREATE TABLE tags
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE posts_tags
(
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags ON DELETE CASCADE
);

INSERT INTO users
    (first_name, last_name, image_url)
VALUES
    ('Mike', 'Duley', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png'),
    ('Steve', 'Plus', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png'),
    ('Spike', 'Davis', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png');

INSERT INTO posts
    (title, content, user_id)
VALUES
    ('Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!', 1),
    ('The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.', 2),
    ('God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.', 2),
    ('God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.', 3);

INSERT INTO tags
    (name)
VALUES
    ('happy'), ('saved'), ('justified');

INSERT INTO posts_tags
    (post_id, tag_id)
VALUES
    (1, 2), (2, 2)