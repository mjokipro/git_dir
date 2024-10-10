"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Skill {

  /** Find all jobs (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */

  static async findAll({ name } = {}) {
    let query = `SELECT name
                 FROM skills
                 `;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (name !== undefined) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY name";
    const skillsRes = await db.query(query, queryValues);
    return skillsRes.rows;
  }

  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO skills (name)
           VALUES ($1)
           RETURNING id, name`,
        [data.name]);

    let skill = result.rows[0];

    return skill;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const skillRes = await db.query(
          `SELECT id,
                  name
           FROM skills
           WHERE id = $1`, [id]);

    const skill = skillRes.rows[0];

    if (!skill) throw new NotFoundError(`No skill: ${id}`);

    const websitesRes = await db.query(
          `SELECT w.id,
                  w.user_id,
                  w.title,
                  w.web_url,
                  w.description
           FROM websites w
           LEFT JOIN websites_skill ws ON ws.web_id = w.id
           WHERE ws.skill_id = $1`, [skill.id]);

    skill.website = websitesRes.rows;

    return skill;
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

    const querySql = `UPDATE skills 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                name 
                      `;
    const result = await db.query(querySql, [...values, id]);
    const skill = result.rows[0];

    if (!skill) throw new NotFoundError(`No skill: ${id}`);

    return skill;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM skills
           WHERE id = $1
           RETURNING id`, [id]);
    const skill = result.rows[0];

    if (!skill) throw new NotFoundError(`No skill: ${id}`);
  }
}

module.exports = Skill;
