"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

  /** Find all orders.
   *
   * Returns [{ user_id, total_items, total_price }, ...]
   **/

class Order {

  static async findAll() {
    const result = await db.query(
          `SELECT user_id,
                  total_items,
                  total_price
           FROM orders
           ORDER BY user_id`,
    );

    return result.rows;
  }

// static async findAll({ minSalary, hasEquity, title } = {}) {
//     let query = `SELECT j.id,
//                         j.title,
//                         j.salary,
//                         j.equity,
//                         j.company_handle AS "companyHandle",
//                         c.name AS "companyName"
//                  FROM jobs j 
//                    LEFT JOIN companies AS c ON c.handle = j.company_handle`;
//     let whereExpressions = [];
//     let queryValues = [];

//     // For each possible search term, add to whereExpressions and
//     // queryValues so we can generate the right SQL

//     if (minSalary !== undefined) {
//       queryValues.push(minSalary);
//       whereExpressions.push(`salary >= $${queryValues.length}`);
//     }

//     if (hasEquity === true) {
//       whereExpressions.push(`equity > 0`);
//     }

//     if (title !== undefined) {
//       queryValues.push(`%${title}%`);
//       whereExpressions.push(`title ILIKE $${queryValues.length}`);
//     }

//     if (whereExpressions.length > 0) {
//       query += " WHERE " + whereExpressions.join(" AND ");
//     }

//     // Finalize query and return results

//     query += " ORDER BY title";
//     const jobsRes = await db.query(query, queryValues);
//     return jobsRes.rows;
//   }
}



module.exports = Order