"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Pizza {

 /** Create a pizza (from data), update db, return new pizza data.
   *
   * data should be { type, description, price }
   *
   * Returns { type, description, price }
   *
   * Throws BadRequestError if pizza already in database.
   * */

 static async create({ type, description, price }) {
  const duplicateCheck = await db.query(
        `SELECT type
         FROM pizzas
         WHERE type = $1`,
      [type]);

  if (duplicateCheck.rows[0])
    throw new BadRequestError(`Duplicate company: ${type}`);

  const result = await db.query(
        `INSERT INTO pizzas
         (type, description, price)
         VALUES ($1, $2, $3)
         RETURNING type, description, price`,
      [
        type,
        description,
        price
      ],
  );
  const pizza = result.rows[0];

  return pizza;

    /** Find all pizzas.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

}

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

  /** Given a pizza type, return data about pizza.
   *
   * Returns {type, description, price }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(type) {
    const pizzaRes = await db.query(
          `SELECT type,
                  description,
                  price
           FROM pizzas
           WHERE type = $1`,
        [type]);

    const pizza = pizzaRes.rows[0];

    if (!pizza) throw new NotFoundError(`No company: ${pizza}`);

    return pizza;
  }

   /** Update pizza data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {type, description, price}
   *
   * Returns {type, description, price }
   *
   * Throws NotFoundError if not found.
   */

   static async update(type, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          description: "description",
          price: "price",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE pizzas 
                      SET ${setCols} 
                      WHERE type = ${handleVarIdx} 
                      RETURNING type, 
                                description, 
                                price`;
    const result = await db.query(querySql, [...values, type]);
    const pizza = result.rows[0];

    if (!pizza) throw new NotFoundError(`No company: ${type}`);

    return pizza;
  }

    /** Delete given pizza from database; returns undefined.
   *
   * Throws NotFoundError if pizza not found.
   **/

    static async remove(type) {
        const result = await db.query(
              `DELETE
               FROM pizzas
               WHERE type = $1
               RETURNING type`,
            [type]);
        const pizza = result.rows[0];
    
        if (!pizza) throw new NotFoundError(`No company: ${type}`);
      }
}


module.exports = Pizza