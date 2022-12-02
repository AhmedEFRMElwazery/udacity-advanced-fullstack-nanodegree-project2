import client from '../../database/database';
import { OrderModel } from '../../models/order.model';
import { UserModel } from '../../models/user.model';
import { TOrder } from '../../types/order.type';
import { TUser } from '../../types/user.type';

const user = new UserModel();
const order = new OrderModel();

describe('Checks whether function and method definitions are properly functioning as expected', () => {
  it("checks the 'create' method on the 'OrderModel' model is properly functioning", () => {
    expect(order.create).toBeDefined();
  });
  it("checks the 'getCurrentOrderByUser' method on the 'OrderModel' model is properly functioning", () => {
    expect(order.getCurrentOrderByUser).toBeDefined();
  });
});

describe("checks the outcome of calling the functions and methods on the 'OrderModel' model", () => {
  let createdUser = {} as TUser;

  //create a user with firstname 'Ahmed', lastname 'Mohammed', and a password of 'A.K.A.AhmedElwazery'
  beforeAll(async () => {
    createdUser = await user.create({
      firstname: 'Ahmed',
      lastname: 'Mohammed',
      password: 'A.K.A.AhmedElwazery',
    });
  });

  it("checks the outcome of calling the 'create' method on the 'OrderModel', and whether it returns the expected result", async () => {
    const result: TOrder = await order.create({
      id: 1,
      status: 'open',
      user_id: String(createdUser.id),
    });

    expect(result).toEqual({
      id: result.id,
      status: 'open',
      user_id: String(createdUser.id),
    });
  });

  it("checks the outcome of calling the 'index' method on the 'OrderModel', and whether it returns the expected result", async () => {
    const result: TOrder[] = await order.getCurrentOrderByUser(
      createdUser.id as number
    );

    expect(result).toEqual([
      {
        id: createdUser.id,
        status: 'open',
        user_id: String(createdUser.id) as string,
      },
    ]);
  });

  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM orders_and_products_table;');
    await conn.query('DELETE FROM orders_table;');
    await conn.query('DELETE FROM users_table;');
    conn.release();
  });
});
