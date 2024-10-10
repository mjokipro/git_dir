/** Message class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");


/** Message on the site. */

class Message {

  static async getAll({id, from_user, to_user, body}){
    const results = await db.query(`
      SELECT id,
        from_user,
        to_user,
        body
      FROM messages
      `)

    return results.rows
  }

  static async getId({id}){
    const results = await db.query(`
      SELECT id,
        from_user,
        to_user,
        body
      FROM messages
      WHERE id = $1
      `, [id])

    return results.rows
  }

  /** register new message -- returns
   *    {id, from_username, to_username, body, sent_at}
   */

  static async create({from_user, to_user, body }) {
    console.debug("Create message: From=", from_user, "To=", to_user, "Body=", body)
    const result = await db.query(
        `INSERT INTO messages (
              from_user,
              to_user,
              body)
            VALUES ($1, $2, $3)
            RETURNING id, from_user, to_user, body`,
        [from_user, to_user, body]);

    return result.rows[0];
  }

  /** Update read_at for message */

  static async markRead(id) {
    const result = await db.query(
        `UPDATE messages
           SET read_at = current_timestamp
           WHERE id = $1
           RETURNING id, read_at`,
        [id]);

    if (!result.rows[0]) {
      throw new ExpressError(`No such message: ${id}`, 404);
    }

    return result.rows[0];
  }

  /** Get: get message by id
   *
   * returns {id, from_user, to_user, body, sent_at, read_at}
   *
   * both to_user and from_user = {username, first_name, last_name, phone}
   *
  // f.last_name AS from_last_name,
  // t.last_name AS to_last_name,
  // t.email AS to_email,
  // f.email AS from_email,
  */
 
 static async get(id) {
   const result = await db.query(
       `SELECT m.id,
              m.from_user,
              m.to_user,
              f.first_name AS from_first_name,
              t.first_name AS to_first_name,
              m.body
        FROM messages AS m
          JOIN users AS f ON m.from_user = f.id
          JOIN users AS t ON m.to_user = t.username
        WHERE m.id = $1`,
        [id]);

        // `SELECT 
        
        // m.id,
        //         m.from_user,
        //         m.to_user,
        //         m.body
        //   FROM messages AS m
        //     JOIN users AS f ON m.from_user = f.id
        //     JOIN users AS t ON m.to_user = t.username
        //   WHERE f.id = $1`,
        // [id]);

    let m = result.rows[0];

    
    if (!m) {
      throw new ExpressError(`No such message: ${id}`, 404);
    }
    console.debug("Message=", m)
    console.log("Message=", m)

    return m
    //  {


    //   id: m.id,
    //   from_user: {
    //     username: m.from_user,
    //   },
    //   to_user: {
    //     username: m.to_user,    
    //   },
    //   body: m.body
    // };
  }

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM messages
           WHERE id = $1
           RETURNING id`, [id]);
    const message = result.rows[0];

    if (!message) throw new NotFoundError(`No message: ${id}`);

  
  }
  
}



module.exports = Message;