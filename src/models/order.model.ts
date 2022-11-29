import Client from '../database/database';
import { TOrder } from '../types/order.type';

export class OrderModel {
  async create(order: TOrder): Promise<TOrder> {
    try {
      const { status, user_id } = order;
      const conn = await Client.connect();

      const sqlQueryString =
        'INSERT INTO orders_table (status, user_id) VALUES ($1, $2) RETURNING *';
      const queryOutcome = await conn.query(sqlQueryString, [status, user_id]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error appeared while adding a new order to the orders_table...Appeared in:\nClass: OrderModel \nFunction: create\nError message: ${error}`
      );
    }
  }

  async getCurrentOrderByUser(user_id: number): Promise<TOrder[]> {
    try {
      const conn = await Client.connect();
      const sqlQueryString =
        "SELECT * FROM orders_table WHERE user_id=($1) AND status='open'";
      const queryOutcome = await conn.query(sqlQueryString, [user_id]);
      conn.release();

      return queryOutcome.rows;
    } catch (error) {
      throw new Error(
        `Error appeared while retrieveing orders from the orders_table...Appeared in:\nClass: OrderModel \nFunction: getCurrentOrderByUser\nError message: ${error}`
      );
    }
  }
}

export default OrderModel;
