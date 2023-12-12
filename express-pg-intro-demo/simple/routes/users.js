/** Routes for users of pg-intro-demo. */

// const db = require("../db");
const express = require("express");
const router = express.Router();
const db = require("../db")

router.get('/', async (req, res) => {
  const results = await db.query(`SELECT * FROM usersdb`)
  return res.json(results.rows)
})

// this version doesn't work --- db.query returns a promise,
// so we need to await it in an async function

/** Get users: [user, user, user] */



module.exports = router;