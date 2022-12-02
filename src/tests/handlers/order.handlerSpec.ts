import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../server.main';
import client from '../../database/database';
import { TOKEN } from '../../config/config';

const req = supertest(app);

describe("Checks whether the status code retured when querying the '/storebackend/api/orders' endpoint is correct", () => {
  let user: unknown;

  //create a user with firstname 'jarvis', lastname 'army', and a password of '11011'
  beforeAll(async () => {
    user = await req.post('/storebackend/api/users').send({
      firstName: 'Ahmed',
      lastName: 'army',
      password: '11011',
    });
  });

  it("returns a status code of '401' if a new order is created WITHOUT a jsonwebtoken", async () => {
    const res = await req
      .post('/storebackend/api/orders')
      .send({ user_id: 1, status: 'open' });
    expect(res.status).toEqual(401);
  });

  it("returns a status code of '200' if a new order is created WITH a jsonwebtoken", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);

    const retrieveUser = await req
      .get('/storebackend/api/users/1')
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);

    const res = await req
      .post('/storebackend/api/orders')
      .send({ user_id: retrieveUser.body.id, status: 'open' })
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);
    expect(res.status).toEqual(200);
  });

  it("returns a status code of '200' if  the request gets the open orders of a user", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);

    const res = await req
      .get(`/storebackend/api/orders/${1}`)
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);

    expect(res.status).toEqual(200);
  });

  it("adds the products for an order on the 'orders/:id/products' endpoint", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);

    const retrieveUser = await req
      .get('/storebackend/api/users/1')
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);

    const createdProduct = await req
      .post('/storebackend/api/products')
      .send({ name: 'Cucumber', price: 5, category: 'vegetables' })
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);

    const productData = createdProduct.body;

    const createdOrder = await req
      .post('/storebackend/api/orders')
      .send({ user_id: retrieveUser.body.id, status: 'open' })
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);

    const orderData = createdOrder.body;

    const createOrderProduct = await req
      .post(`/storebackend/api/orders/${orderData.id}/products`)
      .send({
        order_id: orderData.id,
        product_id: productData.id,
        quantity: 7,
      })
      .set('Authorization', 'Bearer ' + signed_jsonwebtoken);
    const orderProduct = createOrderProduct.body;

    expect(createOrderProduct.status).toEqual(200);
    expect(orderProduct).toEqual({
      id: 1,
      order_id: '2',
      product_id: '1',
      quantity: 7,
    });
  });
  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM orders_and_products_table;');
    await conn.query('DELETE FROM orders_table;');
    await conn.query('DELETE FROM users_table;');
    await conn.query('DELETE FROM products_table;');
    conn.release();
  });
});
