/** Dog model.
 *
 * These is an example of smarter, stateful model. It acts a
 * bit like an ORM, in that you make instances of Dog and call
 * methods on them.
 *
 * */

const db = require("../db");


class Dog {

  /** Make new dog --- this doesn't save to database.
   *
   * Outside callers should use Dog.create.
   *
   */

  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  /** get all dogs: returns [dog, ...] */

  static async getAll() {
    const result = await db.query(
        `SELECT id, name, age FROM dogs`);
    return result.rows.map(d => new Dog(d.id, d.name, d.age));
  }

  /** get dog by id: returns dog */

  static async getById(id) {
    const result = await db.query(
        `SELECT name, age FROM dogs WHERE id = $1`,
        [id]);

    if (result.rows.length === 0) {
      throw new Error(`No such dog: ${id}`);
    }

    let d = result.rows[0];
    return new Dog(id, d.name, d.age);
  }

  /** create a dog: returns dog */

  static async create(name, age) {
    const result = await db.query(
        `INSERT INTO dogs (name, age)
        VALUES ($1, $2) RETURNING id`,
        [name, age]);

    let { id } = result.rows[0];
    return new Dog(id, name, age);
  }

  /** save dog to db */

  async save() {
    await db.query(
        `UPDATE dogs SET name=$1, age=$2 WHERE id = $3`,
        [this.name, this.age, this.id]);
  }

  /** delete dog */

  async remove() {
    await db.query(
        `DELETE FROM dogs WHERE id = $1`,
        [this.id]);
  }
}


module.exports = Dog;