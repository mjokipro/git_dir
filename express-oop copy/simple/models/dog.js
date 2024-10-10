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

    let { id } = result.rows[0];
    return new Dog(id, name, age);
  }
  speak(){
    console.log(`${ this.name } says Woof!`)
  }
}

module.exports = Dog