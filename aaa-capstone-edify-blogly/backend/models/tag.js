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
        [
          name,
        ],
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
    let query = `SELECT name
                 FROM tags
                 ORDER BY name`;
    
    const tagsRes = await db.query(query);
    console.debug("find all tags", tagsRes.rows)
    return tagsRes.rows;
  }

  /** Given a tag id, return data about tag.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const tagsRes = await db.query(
      `SELECT id, name
      FROM tags
      WHERE id = $1
      ORDER BY id`,
   [id],
      );
    
    if (!id) throw new NotFoundError(`No post: ${id}`);
    
    // const tagsRes = await db.query(
    //   `SELECT t.name
    //   FROM tags AS t 
    //   LEFT JOIN posts_tags AS pt ON t.id = pt.tag_id
    //   LEFT JOIN posts AS p ON p.id == pt.post_id
    //   WHERE p.id = $1
    //   `,
    //   [id]
    //   );
      
      const tags = tagsRes.rows
      console.debug("Tag - tagsRes", tags)

    return tags;
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

  static async update(id, {name}) {

    const tags = await db.query(`UPDATE tags 
                      SET name = $1
                      WHERE id = $2 
                      RETURNING id, name `, [name, id])
  
    const tag = tags.rows[0];

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

    if (!tag) throw new NotFoundError(`No tag: ${tag}`);
  }
}


module.exports = Tag;
