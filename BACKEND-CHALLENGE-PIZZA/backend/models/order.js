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

class Order {

  static async findAll() {
    const result = await db.query(
          `SELECT user_id,
                  total_items,
                  total_price
           FROM orders
           ORDER BY user_id`,
    );

    return result.rows;
  }
}


module.exports = Order