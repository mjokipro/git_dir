"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for companies. */

class Post {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/

  static async create({title, content}) {
    const result = await db.query(
          `INSERT INTO posts (title,
                             content)
           VALUES ($1, $2)
           RETURNING id, title, content`,
        [
          title,
          content
        ]);
    let post = result.rows[0];
    console.debug(post)

    return post;
  }

  static async findAllAll() {
    let postsRes = db.query(`SELECT p.id,
    p.title,
    p.content,
    t.name
FROM posts p 
LEFT JOIN posts_tags AS pt ON p.id = pt.post_id
LEFT JOIN tags AS t ON t.id = pt.tag_id`)
    
    console.debug(postsRes.rows)
    return postsRes.rows;
  }

  /** Find all jobs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */

  static async findAll({title} = {}) {
    let query = (`SELECT p.id,
                        p.title,
                        p.content,
                        t.name
                 FROM posts p 
                   LEFT JOIN posts_tags AS pt ON p.id = pt.post_id
                   LEFT JOIN tags AS t ON t.id = pt.tag_id
                   
                  `);
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY title";
    const postsRes = await db.query(query, queryValues);
    const posts = postsRes.rows
    console.debug(posts)
    return posts;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const posts = await db.query(
          `SELECT id,
                  title,
                  content
           FROM posts
           WHERE id = $1`, [id]);

    const post = posts.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    const tags = await db.query(`
    SELECT t.id,
    t.name
    FROM tags t 
    JOIN posts_tags AS pt ON t.id = pt.tag_id
    JOIN posts AS p ON p.id = pt.post_id`)
    delete post.id;
    post.tags = tags.rows;

    return post;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE posts 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title, 
                                content`;
    const result = await db.query(querySql, [...values, id]);
    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    return post;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM posts
           WHERE id = $1
           RETURNING id`, [id]);
    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);
  }
}

module.exports = Post;
