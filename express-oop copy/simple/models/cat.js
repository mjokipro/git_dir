const db = require("../db");
const ExpressError = require("../expressError");

class Cat{
    static async getAll(){
        let results = await db.query(`SELECT id, name, age FROM cats`);
          return results.rows
    }

    static async getById(id){
        let results = await db.query(`SELECT id, name, age FROM cats 
            WHERE id = $1`, [id])
        if(results.rows.length === 0){
            throw new ExpressError(`Cat not found.`, 404)
        }
        return results.rows[0]
    }

    static async post_create(name, age){
        if(!name || !age){
            throw new ExpressError("Cannot create", 400)
        }
        const result = await db.query(`
            INSERT INTO cats (name, age)
            VALUES ($1, $2)
            RETURNING id, name, age`, [name, age])
        if(result.rows.length === 0){
            throw new ExpressError("Cat not found", 404)
        }
        return result.rows[0]
    }

    static async delete(id){
        const result = await db.query(`
            DELETE FROM cats
            WHERE id = $1
            RETURNING id`, [id])  
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404)
        }
    } 
    
    static async update(id, newName, newAge){
        const result = await db.query(`
            UPDATE cats SET name = $1, age = $2
            WHERE id = $3
            RETURNING id, name, age
        `, [newName, newAge, id])
        if (result.rows.length === 0) {
            throw new ExpressError("Cat not found", 404)
        }
        return result.rows[0]
    }
    // PATCH //
  static async makeOlder(id) {
    const result = await db.query(`
      UPDATE cats SET age  = age + 1
      WHERE id = $1
      RETURNING id, name, age
    `, [id])
    if (result.rows.length === 0) {
      throw new ExpressError("Cat not found", 404)
    }
    return result.rows[0]
  }
}

module.exports = Cat