"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for tags. */

class Tag {
  /** Create a tag (from data), update db, return new company data.
   *
   * data should be {name}
   *
   * Returns { name }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create(data) {
    const duplicateCheck = await db.query(
          `SELECT name
           FROM tags
           WHERE name = $1`,
        [data.name]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate tag: ${data.name}`);

    const result = await db.query(
          `INSERT INTO tags
           (name)
           VALUES ($1)
           RETURNING id, name`,
        [data.name]
    );
    const tag = result.rows[0];
    console.debug("Create a tag (from data), update db", tag)

    return tag;
  }

  /** Find all tags 
   *
   * Returns [{tags }, ...]
   * 
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
   * Returns { id, tag, posts }
   *   where posts are [{ postId, title, content }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const tagsRes = await db.query(
      `SELECT id, name
      FROM tags
      WHERE id = $1`,
    [id]);
    
  const tag = tagsRes.rows[0]
    
  if (!tag) throw new NotFoundError(`No post: ${id}`);
  
  const postsRes = await db.query(
    `SELECT p.id AS postId, p.title, p.content
    FROM posts_tags AS pt 
    LEFT JOIN posts AS p ON p.id = pt.post_id
    WHERE pt.tag_id = $1
    `, [id]);
    
  if (!postsRes) throw new NotFoundError(`No post: ${id}`);

  tag.posts = postsRes.rows
      
  console.debug("Tag - tagsRes", tag)

  return tag;

  }

  /** Update tag name with `{ name }`.
   *
   * { name } can include: { name }
   *
   * Returns { id, name }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, { name }) {

    const tags = await db.query(`UPDATE tags 
                      SET name = $1
                      WHERE id = $2 
                      RETURNING id, name `, [name, id])
  
    const tag = tags.rows[0];

    if (!tag) throw new NotFoundError(`No tag: ${id}`);

    return tag;
  }

  /** Delete given tag from database; returns undefined.
   *
   * Throws NotFoundError if tag not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM tags
           WHERE id = $1
           RETURNING id`,
        [id]);
    const tag = result.rows[0];

    if (!tag) throw new NotFoundError(`No tag: ${id}`);
  }
}


module.exports = Tag;
