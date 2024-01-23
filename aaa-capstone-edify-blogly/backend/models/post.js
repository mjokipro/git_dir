"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for companies. */

class Post {
  /** Create a post (from data), update db, return new post data.
   *
   * data should be { title, content }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO posts (title,
                             content)
           VALUES ($1, $2)
           RETURNING id, title, content`,
        [
          data.title,
          data.content
        ]);
    let post = result.rows[0];
    console.debug(post)

    return post;
  }

  static async getAll(){
    const postsRes = await db.query(
      `SELECT title, content
      FROM posts`
    )

    let posts = postsRes.rows

    if(!posts) throw new NotFoundError

    return posts
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

  static async findAll({ title, content } = {}) {
    let posts = `SELECT p.id,
                        p.title,
                        p.content
                 FROM posts p 
                   LEFT JOIN posts_tags AS pt ON p.id = pt.post_id
                   LEFT JOIN tags AS t ON t.id = pt.tag_id`;
    
    // Finalize query and return results

    const postsRes = await db.query(query, queryValues);
    console.debug(postsRes.rows)
    return postsRes.rows;
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

    const tags = await db.query(`SELECT name
    FROM tags AS t 
    LEFT JOIN posts_tags AS pt ON t.id = pt.tag_id
    LEFT JOIN posts AS p ON p.id = pt.post_id
    WHERE p.id = $1`, [id])
    
    if(!tags) throw new NotFoundError(`No tags`)

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

  static async update(id, {title, content}) {
   
    const result = await db.query(`UPDATE posts 
                      SET title = $1,
                      content = $2 
                      WHERE id = id 
                      RETURNING id, 
                                title, 
                                content`, [title, content])

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
