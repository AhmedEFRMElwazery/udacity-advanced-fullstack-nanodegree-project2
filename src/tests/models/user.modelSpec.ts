import client from "../../database/database";
import { UserModel} from "../../models/user.model";
import { TUser } from "../../types/user.type";


const user = new UserModel();

describe("Checks the function and method definitions on the 'UserModel' model", () => {
  it("checks whether the 'index' method on the 'UserModel' is defined", () => {
    expect(user.index).toBeDefined();
  });
  it("checks whether the 'create' method on the 'UserModel' is defined", () => {
    expect(user.create).toBeDefined();
  });
  it("checks whether the 'authenticate' method on the 'UserModel' is defined", () => {
    expect(user.authenticate).toBeDefined();
  });
});

describe("Checks whether function and method definitions on the 'UserModel' model are properly functioning as expected", () => {
  
  it("checks the outcome of calling the 'create' method on the 'UserModel', and whether it returns the expected result", async () => {
    
    const result: TUser = await user.create({
      id: 3,
      firstname: "Ahmed",
      lastname: "Mohammed",
      password: "A.K.A.AhmedElwazery",
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        id: result.id,
        firstname: "Ahmed",
        lastname: "Mohammed",
      })
    );

  });

  it("checks the outcome of calling the 'authenticate' method on the 'UserModel', and whether it returns the expected result", async () => {
    
    const result: TUser | null = await user.authenticate({
      firstname: "Ahmed",
      lastname: "Mohammed",
      password: "A.K.A.AhmedElwazery",
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        firstname: "Ahmed",
        lastname: "Mohammed",
      })
    );

  });

  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query("DELETE FROM users;");
    conn.release();
  });
});
