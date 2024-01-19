\echo 'Delete and recreate blogly_cap db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE blogly_cap;
CREATE DATABASE blogly_cap;
\connect blogly_cap

\i blogly-cap-schema.sql
\i blogly-cap-seed.sql

\echo 'Delete and recreate blogly_cap_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE blogly_cap_test;
CREATE DATABASE blogly_cap_test;
\connect blogly_cap_test

\i blogly-cap-schema.sql
