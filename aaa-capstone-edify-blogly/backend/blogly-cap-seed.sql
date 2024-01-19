-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, logo_url, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        'https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png',
        TRUE);

INSERT INTO tags
    (name)
VALUES
    ('happy'), ('saved'), ('justified');

INSERT INTO posts
    (title, content, tag_id)
VALUES
    ('Jesus is the Son of God!', 'Gods Son, the Lord Jesus Christ, is both God and man!', 1),
    ('The blood Jesus shed on the cross covers sinners in His white robe of righteousness!', 'As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.', 2),
    ('God is good!', 'Gods definition of good differs from mans.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by Gods perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.', 2),
    ('God is Trinitarian!', 'There is one God consisting of three persons; Father, Son, and Holy Spirit.', 3);

-- INSERT INTO users_posts
--     (username, post_id)
-- VALUES
--     (1, 1), (1, 2), (2, 2)       