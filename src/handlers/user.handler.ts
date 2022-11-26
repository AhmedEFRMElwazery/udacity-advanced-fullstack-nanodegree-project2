import type { Request, Response, Application } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { TOKEN } from "../config";
import { UserModel } from "../models/user.model";
import verifyAuthToken from "../middleware/verifyAuthTok.middlewear";

const user = new UserModel();

const retrieveAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await user.index();
    res.json(users);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const showAUserWithSpecificIdHandler = async (req: Request, res: Response) => {
  try {
    const retrievedUser = await user.show(parseInt(req.params.id));
    res.json(retrievedUser);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const createAUserHandler = async (req: Request, res: Response) => {
  try {
    const createdUser = await user.create(req.body);
    const signedToken = jwt.sign({ createdUser }, TOKEN as Secret);
    res.json(signedToken);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const authenticateAUserHandler= async (req: Request, res: Response) => {
  try {
    const authenticatedUser = await user.authenticate(req.body);
    if (!authenticatedUser) {
      res.sendStatus(401)
    }
    const signedToken = jwt.sign({ user: authenticatedUser?.password }, TOKEN as Secret);
    res.json(signedToken);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const routes_for_user = (app: Application) => {
  app.get("/users", verifyAuthToken, retrieveAllUsersHandler);
  app.get("/users/:id", verifyAuthToken, showAUserWithSpecificIdHandler);
  app.post("/users", createAUserHandler);
  app.get("/users/authenticate", authenticateAUserHandler);
};

export default routes_for_user;
