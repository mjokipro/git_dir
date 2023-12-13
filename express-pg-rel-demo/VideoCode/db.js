/** Database client for pg-relationships-demo. */

const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///pg_relationships"
});

client.connect();

module.exports = client;
