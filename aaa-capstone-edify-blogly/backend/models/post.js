"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");

/** Related functions for companies. */

class Post {
  /** Create a post (from data), update db, return new post data.
   *
   * data should be { title, content }
   *
   * Returns { id, title, content }
   **/

  static async create(data) {

    const preCheck = await db.query(
      `SELECT id
      FROM posts
      WHERE id = $1`, [data.id])
    const postCheck = preCheck.rows[0]

    if (postCheck) throw new NotFoundError(`Already post: ${data.id}`);

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

  /** Apply tag to post: update db, returns undefined.
   *
   * - postId: post id
   * - tagId: tag being applied to post
   **/

  static async createPostTag(postId, tagId){

    // const postIdPreCheck = await db.query(
    //   `SELECT post_id
    //   FROM posts_tags
    //   WHERE post_id = $1`, [postId])
    // const post = postIdPreCheck[0]
      
    // if (!post) throw new NotFoundError(`Already post: ${postId}`);
    
    // const tagIdPreCheck = await db.query(
    //   `SELECT tag_id
    //   FROM posts_tags
    //   WHERE tag_id = $1`, [tagId])
    // const tag = tagIdPreCheck[0]

    // post.tag = tag

    // if (!post.tag) throw new NotFoundError(`No tag: ${tagId}`);
    
  
    await db.query(
      `INSERT INTO posts_tags (post_id, tag_id)
      VALUES ($1, $2)`, [postId, tagId])
  }

  /** GET all posts 
   *
   * Returns [{ id, title, content }, ...]
   * 
   * */

  static async getAll(){
    const postsRes = await db.query(
      `SELECT id, title, content
      FROM posts`
    )

    let posts = postsRes.rows

    if(!posts) throw new NotFoundError

    return posts
  }

  /** Given a post id, return data about post.
   *
   * Returns { id, title, post, tags }
   *   where tags are [{tag}, ...]
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
    SELECT name
    FROM tags AS t 
    LEFT JOIN posts_tags AS pt ON t.id = pt.tag_id
    LEFT JOIN posts AS p ON p.id = pt.post_id
    WHERE p.id = $1`, [id])
    
    if(!tags) throw new NotFoundError(`No tags`)

    delete post.id;
    post.tags = tags.rows;

    return post;
  }

  /** Update post data with `data`.
   *
   * Data can include: { title, content }
   *
   * Returns { id, title, content }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
   
    const result = await db.query(`UPDATE posts 
                      SET title = $1,
                      content = $2 
                      WHERE id = id 
                      RETURNING id, 
                                title, 
                                content`, [data.title, data.content])

    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    return post;
  }

  /** Delete given post from database; returns undefined.
   *
   * Throws NotFoundError if post not found.
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
