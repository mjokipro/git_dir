"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Order {
  
 /** Create an order (from data), update db, return new order data.
   *
   * data should be { user_id, total_items, total_price }
   *
   * Returns { id, user_id, total_items, total_price }
   **/

 static async create(data) {
  const result = await db.query(
        `INSERT INTO orders (user_id,
                           total_items,
                           total_price)
         VALUES ($1, $2, $3)
         RETURNING id, user_id, total_items, total_price`,
      [
        data.user_id,
        data.total_items,
        data.total_price
      ]);
  
      let order = result.rows[0];

  return order;
}
  
  /** Find all orders.
   *
   * Returns [{ user_id, total_items, total_price }, ...]
   **/

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

   /** Given an order id, return data about order.
   *
   * Returns { id, user_id, total_items, total_price }
   *   where pizzas are [{ type, description, price }, ...]
   *
   * Throws NotFoundError if not found.
   **/

   static async get(id) {
    const orderRes = await db.query(
          `SELECT id,
                  user_id,
                  total_items,
                  total_price
           FROM orders
           WHERE id = $1`, [id]);

    const order = orderRes.rows[0];

    if (!order) throw new NotFoundError(`No order: ${id}`);

    const pizzasRes = await db.query(
          `SELECT p.type,
                  p.description,
                  p.price,
                  op.qty 
          FROM pizzas p
          JOIN orders_pizzas op ON op.type = p.type
          JOIN orders o ON op.order_id = o.id
          WHERE o.id = $1`, [order.id]);

    // delete order.id;
    order.pizzas = pizzasRes.rows;

    return order;
  }

     /** Given an order id, return data about order.
   *
   * Returns { id, user_id, total_items, total_price }
   *   where pizzas are [{ type, description, price }, ...]
   *
   * Throws NotFoundError if not found.
   **/

     static async getAllOrders(user_id) {
      const orderRes = await db.query(
            `SELECT id,
                    user_id,
                    total_items,
                    total_price
             FROM orders
             WHERE user_id = $1`, [user_id]);
  
      const order = orderRes.rows[0];
  
      if (!order) throw new NotFoundError(`No order: ${id}`);
  
      const pizzasRes = await db.query(
            `SELECT p.type,
                    p.description,
                    p.price,
                    op.qty 
            FROM pizzas p
            JOIN orders_pizzas op ON op.type = p.type
            JOIN orders o ON op.order_id = o.id
            WHERE o.id = $1`, [order.id]);
  
      // delete order.id;
      order.pizzas = pizzasRes.rows;
  
      return order;
    }

 /** Create a pizzaItem (from data), update db, return new order data.
   *
   * data should be { type, order_id, qty }
   *
   * Returns { type, order_id, qty }
   **/

  static async addPizzaItem(data) {

    // const orderQty = await db.query(
    //   `UPDATE orders
    //       VALUES total_items = total_items + $1
    //       WHERE id = $2 AND user_id = $3
    //   `, [data.qty, data.id, data.username]
    // )

    
    
    const orderItem = await db.query(
      `INSERT INTO orders_pizzas (type,
        order_id,
        qty)
        VALUES ($1, $2, $3)
        RETURNING type, order_id, qty`,
        
        [
          data.type,
          data.order_id,
          data.qty
        ]);

        const orderPrice = await db.query(
          `UPDATE orders
              SET total_price = total_items * $1
              WHERE id = $2 AND user_id = $3
          `, [data.price, data.id, data.username]
        )

    let pizzaItem = orderItem.rows[0]

    return pizzaItem
  }

    /** Update pizzaItem data with `data`.
   *
   * Data can include: { qty }
   *
   * Returns { qty, type, order_id }
   *
   * Throws NotFoundError if not found.
   */

  static async updatePizzaItem(order_id, type, data){
    const orderItem = await db.query(
      `
      UPDATE orders_pizzas 
      SET qty = $1
      WHERE type = $2 AND order_id = $3
      RETURNING qty, type, order_id
      `, [data.qty, type, order_id]
    )

    let pizzaItem = orderItem.rows[0]

    return pizzaItem
  }

  /** Delete given pizzaItem from database; returns undefined.
   *
   * Throws NotFoundError if pizzaItem not found.
   **/

  static async removePizzaItem(order_id, type){
    const pizzasRes = await db.query(
      `DELETE 
          FROM orders_pizzas 
          WHERE order_id = $1 AND type = $2
          RETURNING order_id
      `, [order_id, type]);

    const pizzaItem = pizzasRes.rows[0]

    if (!pizzaItem) throw new NotFoundError(`No job: ${user_id}`);
    }
  

  /** Delete given order from database; returns undefined.
   *
   * Throws NotFoundError if order not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM orders
           WHERE id = $1
           RETURNING id`, [id]);
    const order = result.rows[0];

    if (!order) throw new NotFoundError(`No order: ${id}`);
  }

}



module.exports = Order