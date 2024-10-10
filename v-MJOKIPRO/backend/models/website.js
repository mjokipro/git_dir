"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Website {

  /** Find all companies (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll({title} = {}) {
   
    let results = await db.query(`SELECT id,
                        user_id,
                        title,
                        web_url,
                        description
                 FROM websites`, [])

    return results.rows
   
    // let query = `SELECT id,
    // user_id,
    //                     title,
    //                     web_url,
    //                     description
    //              FROM websites`;
    // let whereExpressions = [];
    // let queryValues = [];


    // console.debug("query", query, "where expressions", whereExpressions, "queryVals", queryValues, "title", title)

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    // if (id !== undefined) {
    //   queryValues.push(id);
    //   whereExpressions.push(`id = $${queryValues.length}`);
    // }

    // if (user_id !== undefined) {
    //   queryValues.push(user_id);
    //   whereExpressions.push(`user_id = $${queryValues.length}`);
    // }

    // if (title) {
    //   queryValues.push(`%${title}%`);
    //   whereExpressions.push(`title ILIKE $${queryValues.length}`);
    // }

    // if (whereExpressions.length > 0) {
    //   query += " WHERE " + whereExpressions.join(" AND ");
    // }

    // query += " ORDER BY title";

    // Finalize query and return results

    // const websitesRes = await db.query(query, queryValues);
    // return websitesRes.rows;
  }

    /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

    static async create({ id, user_id, title, web_url, description }) {
      const duplicateCheck = await db.query(
            `SELECT id
             FROM websites
             WHERE id = $1`,
          [id]);
  
      if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate company: ${id}`);
  
      const result = await db.query(
            `INSERT INTO websites
             (user_id, title, web_url, description)
             VALUES ($1, $2, $3, $4)
             RETURNING id, user_id, title, web_url, description`,
          [
            id,
            user_id,
            title,
            web_url,
            description
          ],
      );
      const website = result.rows[0];
  
      return website;
    }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const websiteRes = await db.query(
          `SELECT id,
                  user_id,
                  title,
                  web_url,
                  description
           FROM websites
           WHERE id = $1`,
        [id]);

    const website = websiteRes.rows[0];

    if (!website) throw new NotFoundError(`No website: ${id}`);

    const skillsRes = await db.query(
          `SELECT s.id, s.name
           FROM skills s
           LEFT JOIN websites_skills ws ON ws.skill_id = s.id
           WHERE ws.web_id = $1
           ORDER BY id`,
        [id],
    );

    website.skills = skillsRes.rows;

    return website;
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
          title: "title",
          web_url: "web_url",
          description: "description",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE websites 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id, 
                      title,
                      web_url, 
                      description`;
    const result = await db.query(querySql, [...values, id]);
    const website = result.rows[0];

    if (!website) throw new NotFoundError(`No website: ${id}`);

    return website;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM websites
           WHERE id = $1
           RETURNING id`,
        [id]);
    const website = result.rows[0];

    if (!website) throw new NotFoundError(`No website: ${id}`);
  }

  /////////////////////////
  
  static async addSkill(websiteId, name) {
    const preCheck = await db.query(
          `SELECT id, name
           FROM skills
           WHERE name = $1
           RETURNING id`, [name]);
    const skill = preCheck.rows[0];

    if (!skill) throw new NotFoundError(`No job: ${name}`);

    const preCheck2 = await db.query(
          `SELECT id
           FROM websites
           WHERE websiteId = $1`, [websiteId]);
    const website = preCheck2.rows[0];

    if (!website) throw new NotFoundError(`No username: ${websiteId}`);

    await db.query(
          `INSERT INTO websites_skills (web_id, skill_id)
           VALUES ($1, $2)`,
        [websiteId, skill.id]);
  }

}


module.exports = Website;
