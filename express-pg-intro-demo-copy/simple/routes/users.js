/** Routes for users of pg-intro-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();


// this version doesn't work --- db.query returns a promise,
// so we need to await it in an async function

/** Get users: [user, user, user] */

// router.get("/all", function (req, res, next) {
//   const results = db.query(
//         `SELECT * FROM usersdb`);

//   return res.json(results.rows);
// });


/** (Fixed) Get users: [user, user, user] */




module.exports = router;