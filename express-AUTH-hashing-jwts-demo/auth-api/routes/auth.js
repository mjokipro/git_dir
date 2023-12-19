/** Routes for demonstrating authentication in Express. */

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const db = require("../db");
const {ensureLoggedIn, ensureAdmin} = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");


/** Register user.
 *   {username, password} => {username} */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username, password)
             VALUES ($1, $2)
             RETURNING username`,
      [username, hashedPassword]);

    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// end

// this version of login does not use JWTs --- it's just a demo
// from the first part of the lecture, pre-JWTs

/** Login: returns {message} on success. */

router.post("/login-1", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]);
    const user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password) === true) {
        return res.json({ message: "Logged in!" });
      }
    }
    throw new ExpressError("Invalid user/password", 400);
  } catch (err) {
    return next(err);
  }
});
// end

/** (Fixed) Login: returns JWT on success. */

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      "SELECT password FROM users WHERE username = $1",
      [username]);
    let user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password) === true) {
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
      }
    }
    throw new ExpressError("Invalid user/password", 400);
  } catch (err) {
    return next(err);
  }
});
// end


/** Secret-1 route than only users can access */

router.get("/secret-1", async function (req, res, next) {
  try {
    // try to get the token out of the body
    const tokenFromBody = req.body._token;

    // verify this was a token signed with OUR secret key
    // (jwt.verify raises error if not)
    jwt.verify(tokenFromBody, SECRET_KEY);

    return res.json({ message: "Made it!" });
  }

  catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
});
// end


/** Secret route: only users can access */

router.get("/secret",
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      return res.json({ message: "Made it!" });
    } catch (err) {
      return next(err);
    }
  });
// end


/** Secret-admin route: only admins can access */

router.get("/secret-admin",
  ensureAdmin,
  async function (req, res, next) {
    try {
      return res.json({ message: "Made it!" });
    } catch (err) {
      return next(err);
    }
  });
// end

module.exports = router;
