/** Routes for users of pg-intro-demo. */

const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM usersdb`);
    return res.json({ users: results.rows })
  } catch (e) {
    return next(e);
  }
})

// this version doesn't work --- db.query returns a promise,
// so we need to await it in an async function

/** Get users: [user, user, user] */



module.exports = router;