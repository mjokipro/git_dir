/** Cat model.
 *
 * These is an example of a simple "collection-of-static-methods"
 * model. It helps get SQL out of routes, but doesn't provide
 * state. You never actually instantiate a Cat.
 *
 * */

const db = require("../db");


class Cat {

  /** get all cats: returns [{id, name, age}, ...] */

  static async getAll() {
    const result = await db.query(
        "SELECT id, name, age FROM cats");
    return result.rows;
  }

  /** get cat by id: returns {name, age} */

  static async getById(id) {
    const result = await db.query(
        `SELECT name, age FROM cats WHERE id = $1`,
        [id]);

    if (result.rows.length === 0) {
      throw new Error(`No such cat: ${id}`);
    }

    return result.rows[0];
  }

  /** create a cat: returns {name, age} */

  static async create(name, age) {
    const result = await db.query(
        `INSERT INTO cats (name, age)
        VALUES ($1, $2) RETURNING name, age`,
        [name, age]);

    return result.rows[0];
  }

  /** delete cat with given id */

  static async remove(id) {
    const result = await db.query(
        `DELETE FROM cats WHERE id=$1 RETURNING id`,
        [id]);

    if (result.rows.length === 0) {
      throw new Error(`No such cat: ${id}`);
    }
  }

  /** age cat by 1 year, return new age */

  static async makeOlder(id) {
    const result = await db.query(
        `UPDATE cats SET age=age+1 WHERE id=$1 RETURNING age`,
        [id]);

    if (result.rows.length === 0) {
      throw new Error(`No such cat: ${id}`);
    }

    return result.rows[0].age;
  }
}


module.exports = Cat;