/** Database for pg-oo */

const pg = require("pg");

const db = new pg.Client("postgresql:///pets_db");

db.connect();


module.exports = db;
