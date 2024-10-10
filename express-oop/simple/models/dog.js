const db = require("../db");
const ExpressError = require("../expressError");

class Dog{
  constructor(id, name, age){
    this.id = id
    this.name = name
    this.age = age
    this.species = "DOG"
  }
  static async getAll(){
    const results = await db.query(`SELECT id, name, age FROM dogs`)
    console.log(results.rows)
    const dogs = results.rows.map(r => new Dog(r.id, r.name, r.age))
    console.log(dogs)
      return dogs
  }
  static async getById(id){
    let results = await db.query(`SELECT id, name, age FROM dogs 
    WHERE id = $1`, [id])
    const d = results.rows[0]
    if(!d){
      throw new ExpressError(`Dog not found.`, 404)
    }
      return new Dog(d.id, d.name, d.age)
  }
  static async addDog(name, age) {
    const result = await db.query(
        `INSERT INTO dogs (name, age)
        VALUES ($1, $2) RETURNING id`,
        [name, age]);
    // const {id, name, age} = result.rows[0]
    let { id } = result.rows[0];
    return new Dog(id, name, age);
  }
  // instance method //
  async delete_2(id){
    await db.query(`
        DELETE FROM dogs WHERE id = $1
        `, [this.id])  
  } 
  async save(){
    await db.query(
      `UPDATE dogs SET name = $1, age = $2
      WHERE id = $3`,
      [this.name, this.age, this.id]);
  }
  speak(){
    console.log(`${ this.name } says Woof!`)
  }
}

module.exports = Dog