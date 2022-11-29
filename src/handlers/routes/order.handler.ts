import type { Request, Response, Application } from "express";
import { OrderModel } from "../../models/order.model";
import verifyAuthTok from "../../middleware/verifyAuthTok.middlewear";

const order = new OrderModel();

const createOrderHandler = async (req: Request, res: Response) => {
  try {
    const orderCreated = await order.create(req.body);
    res.json(orderCreated);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getCurrentOrderByUserHandler = async (req: Request, res: Response) => {
  try {
    const ordersStored = await order.getCurrentOrderByUser(parseInt(req.params.user_id));
    res.json(ordersStored);
  } catch (err) {
    res.sendStatus(500);
  }
};

const routes_for_order = (app: Application) => {
  app.post("/orders", verifyAuthTok, createOrderHandler);
  app.get("/orders/:user_id", verifyAuthTok, getCurrentOrderByUserHandler);
};

export default routes_for_order;
