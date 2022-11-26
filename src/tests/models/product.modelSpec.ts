import client from "../../database/database";
import { ProductModel } from "../../models/product.model";
import { TProduct } from "../../types/product.type";

const product = new ProductModel();

describe("Checks the function and method definitions on the 'ProductModel' model", () => {
  
  it("checks whether the 'index' method on the 'ProductModel' is defined", () => {
    expect(product.index).toBeDefined();
  });
  it("checks whether the 'show' method on the 'ProductModel' is defined", () => {
    expect(product.show).toBeDefined();
  });
  it("checks whether 'create' method on the 'ProductModel' is defined", () => {
    expect(product.create).toBeDefined();
  });
});

describe("Checks whether function and method definitions on the 'ProductModel' model are properly functioning as expected", () => {
  it("checks the outcome of calling the 'create' method on the 'ProductModel', and whether it returns the expected result", async () => {
    
    const outcome: TProduct = await product.create({
      id: 1,
      name: "pizza",
      price: 15,
      category: "fastfood",
    });
    
    expect(outcome).toEqual({
      id: outcome.id,
      name: "pizza",
      price: 15,
      category: "fastfood",
    });

  });

  it("checks the outcome of calling the 'index' method on the 'ProductModel', and whether it returns the expected result", async () => {
    
    const outcome: TProduct[] = await product.index();

    expect(outcome).toEqual([
      {
        id: outcome[0].id,
        name: "pizza",
        price: 15,
        category: "fastfood",
      },
    ]);

  });

  it("checks the outcome of calling the 'show' method on the 'ProductModel', and whether it returns the expected result", async () => {
    
    const createProduct = await product.create({
      id: 2,
      name: "oatmeal",
      price: 33,
      category: "healthyfood",
    });

    const outcome = await product.show(createProduct.id);
    
    expect(outcome).toEqual({
      id: createProduct.id,
      name: "oatmeal",
      price: 33,
      category: "healthyfood",
    });

  });

  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    const sqlQuery = "DELETE FROM products;";
    await conn.query(sqlQuery);
    await conn.release();
  });
});
