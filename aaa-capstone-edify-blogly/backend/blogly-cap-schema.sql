

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
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
    tag_id INTEGER REFERENCES tags,
    created_at DATE
);

CREATE TABLE users_posts
(
    -- id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts ON DELETE CASCADE,
    PRIMARY KEY (username, post_id)
);

-- INSERT INTO users
--     (username, password, first_name, last_name, email, logo_url, is_admin)
-- VALUES
--     ('test', 'password', 'Test', 'User', 'test@test.com', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png', FALSE),
--     ('test2', 'password', 'Test', 'User', 'test@test.com', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png', FALSE),
--     ('test3', 'password', 'Test', 'User', 'test@test.com', 'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png', FALSE);

-- INSERT INTO posts
--     (title, content, user_id)
-- VALUES
--     ('Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!','test'),
--     ('The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.', 'test2'),
--     ('God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.', 'test2'),
--     ('God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.', 'test3');

-- INSERT INTO tags
--     (name)
-- VALUES
--     ('happy'), ('saved'), ('justified');

-- INSERT INTO posts_tags
--     (post_id, tag_id)
-- VALUES
--     (1, 1), (1, 2), (2, 2)