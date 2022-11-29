import client from '../database/database';
import { TOrder_Product } from '../types/order-product.type';

export class OrdersProductsModel {
  async index(): Promise<TOrder_Product[]> {
    try {
      const conn = await client.connect();
      const sqlQueryString = 'SELECT * FROM orders_and_products_table';
      const queryOutcome = await conn.query(sqlQueryString);
      conn.release();

      return queryOutcome.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: string): Promise<TOrder_Product> {
    try {
      const conn = await client.connect();
      const sqlQueryString =
        'SELECT * FROM orders_and_products_table WHERE order_id=$1';
      const queryOutcome = await conn.query(sqlQueryString, [id]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(orderProduct: TOrder_Product): Promise<TOrder_Product> {
    try {
      const { order_id, product_id, quantity } = orderProduct;
      const conn = await client.connect();
      const sqlQueryString =
        'INSERT INTO orders_and_products_table (order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *';
      const queryOutcome = await conn.query(sqlQueryString, [
        order_id,
        product_id,
        quantity,
      ]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error appeared while adding the order...Appeared in:\nClass: OrdersProductsModel \nFunction: create\nError message: ${error}`
      );
    }
  }
}

export default OrdersProductsModel;
