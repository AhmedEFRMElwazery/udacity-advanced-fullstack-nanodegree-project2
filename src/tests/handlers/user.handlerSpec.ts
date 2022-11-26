import supertest from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../server.main";
import client from "../../database/database";
import { TOKEN } from "../../config";

const req = supertest(app);

describe("Checks whether the status code returned when querying the '/users' endpoint is correct", () => {
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

  it("returns a status code of '200' if a new user is created successfully", async () => {
    const res = await req.post("/users")
                         .send({ 
                          firstName: "major", 
                          lastName: "maverick", 
                          password: "topGun" 
                        });
    expect(res.status).toEqual(200);
  });

  it("returns a status code of '200' if retrieving all the users was successful", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);
    const res = await req
      .get(`/users`)
      .set("Authorization", "Bearer " + signed_jsonwebtoken);
    expect(res.status).toBe(200);
  });

  it("returns a status code of '200' if a user is retrieved successfully when queried", async () => {
    const signed_jsonwebtoken = jwt.sign({ user }, TOKEN as string);
    const res = await req
      .get("/users/1")
      .set("Authorization", "Bearer " + signed_jsonwebtoken);
    expect(res.status).toEqual(200);
  });

  //resets all the changes back to the initial conditions
  afterAll(async () => {
    const conn = await client.connect();
    const sqlQuery = "DELETE FROM users;";
    await conn.query(sqlQuery);
    await conn.release();
  });
});
