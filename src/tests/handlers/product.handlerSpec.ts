import supertest from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../server.main";
import client from "../../database/database";
import { TOKEN } from "../../config";

const req = supertest(app);

describe("Checks whether the status code returned when querying the '/products' endpoint is correct", () => {
  let user: unknown;
  
  //create a user with firstname 'jarvis', lastname 'army', and a password of '11011'
  beforeAll(async () => {
    user = await req.post("/users")
                    .send({ 
                      firstName: "jarvis", 
                      lastName: "army", 
                      password: "11011" 
                    });
  });

  it("returns a status code of '200' if all the products were retrieved successfully", async () => {
    const res = await req.get(`/products`);
    expect(res.status).toBe(200);
  });

  it("returns a status code of '401' if a new product is created WITHOUT a jwt", async () => {
    const res = await req.post("/products");
    expect(res.status).toEqual(401);
  });

  it("returns a status code of '200' if a new product is created WITH jwt", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);

    const res = await req
      .post("/products")
      .send({ name: "Apples", price: 11, category: "fruits" })
      .set("Authorization", "Bearer " + signed_jsonwebtoken);

    expect(res.status).toEqual(200);

    expect(res.body).toEqual({
      id: res.body.id,
      name: "Apples",
      price: 11,
      category: "fruits",
    });

  });

  it("returns a status code of '200' if a product was queried", async () => {

    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);

    const createdProduct = await req
      .post("/products")
      .send({ name: "Apples", price: 11, category: "fruits" })
      .set("Authorization", "Bearer " + signed_jsonwebtoken);
      
    const productData = createdProduct.body;

    const res = await req.get(`/products/${productData.id}`);

    expect(res.status).toEqual(200);

    expect(res.body).toEqual(productData);
  });

  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    const sqlQuery = "DELETE FROM products;";
    await conn.query(sqlQuery);
    await conn.release();
  });
});
