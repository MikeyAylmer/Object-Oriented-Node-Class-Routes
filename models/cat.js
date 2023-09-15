// must import database.
const db = require("../db");
const ExpressError = require("../expressError")

class Cat {
  // Static method on the cat table to get all cats
  static async getAll() {
    let result = await db.query("SELECT id, name, age FROM cats");
    return result.rows;
  }
  // Static method on cats table to get cat by id. 
  static async getById(id) {
    const result = await db.query(`SELECT id, name, age FROM cats WHERE  id = $1`, [id]);
    if (result.rows.length === 0) {
      throw new ExpressError("Cat not found", 404)
    }
    return result.rows[0];
  }
  // Static method to create a new cat for cat table.
  static async create(name, age) {
    // if statement to check for name & age.
    if (!name || !age) {
      throw new ExpressError("Missing required data", 400);
    }
    const result = await db.query(
      `INSERT INTO cats (name, age) 
      VALUES ($1, $2)
      RETURNING id, name, age`,
      [name, age]);
    return result.rows[0];
  }
  // Static method for deleting a Cat from the cats table.
  static async delete(id) {
    const result = await db.query(`
      DELETE FROM cats
      WHERE id = $1
      RETURNING id`,
      [id])
    if (result.rows.length === 0) {
      throw new ExpressError("Cat not found", 404)
    }
  }
  // Static method for updating name & age on cat by id.
  static async update(id, newName, newAge) {
    const result = await db.query(`
      UPDATE cats SET name = $1, age  = $2 
      WHERE id = $3
      RETURNING id, name, age
    `, [newName, newAge, id])
    if (result.rows.length === 0) {
      throw new ExpressError("Cat not found", 404)
    }
    return result.rows[0]
  }
  // Static method that makes cat older.
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
module.exports = Cat; //Exports Cat Class Static Methods

