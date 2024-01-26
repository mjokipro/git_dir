"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for tags. */

class Tag {

  /** Create a tag (from data), update db, return new company data.
   *
   * data should be {name }
   *
   * Returns { name }
   *
   * Throws BadRequestError if company already in database.
   * */

  

  static async create({ name }) {
    const duplicateCheck = await db.query(
          `SELECT name
           FROM tags
           WHERE name = $1`,
        [name]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate tag: ${name}`);

    const result = await db.query(
          `INSERT INTO tags
           (name)
           VALUES ($1)
           RETURNING name`,
        [name],
    );
    const tag = result.rows[0];
    console.debug("Create a tag (from data), update db", tag)

    return tag;
  }

  /** Find all tags (optional filter on searchFilters).
   *
   * 
   *
   * Returns [{tags }, ...]
   * */

  static async findAll() {
    let results = await db.query(`
      SELECT id, name
      FROM tags`)

      if (!results) throw new BadRequestError("no results for tags")
      
      return results.rows
    // let whereExpressions = [];
    // let queryValues = [];

    // const { name } = searchFilters;

    // if (!name) {
    //   throw new BadRequestError("Min employees cannot be greater than max");
    // }

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    // if (minEmployees !== undefined) {
    //   queryValues.push(minEmployees);
    //   whereExpressions.push(`num_employees >= $${queryValues.length}`);
    // }

    // if (maxEmployees !== undefined) {
    //   queryValues.push(maxEmployees);
    //   whereExpressions.push(`num_employees <= $${queryValues.length}`);
    // }

    // if (name) {
    //   queryValues.push(`%${name}%`);
    //   whereExpressions.push(`name ILIKE $${queryValues.length}`);
    // }

    // if (whereExpressions.length > 0) {
    //   query += " WHERE " + whereExpressions.join(" AND ");
    // }

    // Finalize query and return results

  //   query += " ORDER BY name";
  //   const tagsRes = await db.query(query, queryValues);
  //   console.degug("find all tags", tagsRes.rows)
  //   return tagsRes.rows;
  }

  /** Given a tag id, return data about tag.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const postRes = await db.query(
      `SELECT id, title, content
      FROM posts
      WHERE id = $1
      ORDER BY id`,
   [id],
      );

    const post = postRes.rows[0];
    console.debug("Tag - get(id)", id, "post", post)
    
    if (!post) throw new NotFoundError(`No post: ${title}`);
    
    const tagsRes = await db.query(
      `SELECT * FROM tags
      `,
      [],
      );

    console.debug("Tag - tagsRes", tagsRes)
    
    post.tags = tagsRes.rows;
    
    console.debug("Return this Post:  ", post)

    return post;
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          name: "name",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE tags 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id, 
                                name `;
    const result = await db.query(querySql, [...values, id]);
    const tag = result.rows[0];

    if (!tag) throw new NotFoundError(`No tag: ${id}`);

    return tag;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM tags
           WHERE id = $1
           RETURNING id`,
        [id]);
    const tag = result.rows[0];

    if (!tag) throw new NotFoundError(`No tag: ${tag.id}`);
  }
}


module.exports = Tag;
