"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

  /** Find all pizzas.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

class Pizza {

  static async findAll() {
    const result = await db.query(
          `SELECT type,
                  description,
                  price
           FROM pizzas
           ORDER BY type`,
    );

    return result.rows;
  }
}


module.exports = Pizza