"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Prop {

    static async addProp(
        { username, fav_color, origin, max_dist, min_age, max_age }) {
  
      const result = await db.query(
            `INSERT INTO props
             (username,
              fav_color,
              origin,
              max_dist,
              min_age,
              max_age)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING username, fav_color, origin, max_dist, min_age, max_age`,
          [
            username,
            fav_color,
            origin,
            max_dist,
            min_age,
            max_age,
          ],
      );
  
      const prop = result.rows[0];
  
      return prop;
    }
}

module.exports = Prop;