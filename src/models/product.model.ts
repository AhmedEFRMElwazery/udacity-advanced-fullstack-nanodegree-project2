import Client from "../database/database";
import { TProduct } from "../types/product.type";

export class ProductModel {

  async index(): Promise<TProduct[]> {
    try {
      const conn = await Client.connect();
      const sqlQueryString = "SELECT * FROM products_table";
      const queryOutcome = await conn.query(sqlQueryString);
      conn.release();

      return queryOutcome.rows;
    } catch (error) {
      throw new Error(`Error appeared while retrieving the products...Appeared in:\nClass: ProductModel \nFunction: index\nError message: ${error}`);
    }
  }

  async show(id: number): Promise<TProduct> {
    try {
      const conn = await Client.connect();
      const sqlQueryString = "SELECT * FROM products_table WHERE id=($1)";
      const queryOutcome = await conn.query(sqlQueryString, [id]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error appeared while retrieving the requested product...Appeared in:\nClass: ProductModel \nFunction: show\nError message: ${error}`
      );
    }
  }

  async create(product: TProduct): Promise<TProduct> {
    try {
      const { name, price, category } = product;
      const conn = await Client.connect();
      const sqlQueryString =
        "INSERT INTO products_table (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const queryOutcome = await conn.query(sqlQueryString, [name, price, category]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error appeared while adding the product named '${product.name}'...Appeared in:\nClass: ProductModel \nFunction: create\nError message: ${error}`
      );
    }
  }
}

export default ProductModel;

