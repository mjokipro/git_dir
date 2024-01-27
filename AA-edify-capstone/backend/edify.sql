\echo 'Delete and recreate edify db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE edify;
CREATE DATABASE edify;
\connect edify

\i edify-schema.sql
\i edify-seed.sql

\echo 'Delete and recreate edify_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE edify_test;
CREATE DATABASE edify_test;
\connect edify_test

\i edify-schema.sql
