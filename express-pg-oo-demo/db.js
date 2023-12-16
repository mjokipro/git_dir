/** Database for pg-oo */

const pg = require("pg");

const db = new pg.Client("postgresql:///express_pg_oo");

db.connect();


module.exports = db;
