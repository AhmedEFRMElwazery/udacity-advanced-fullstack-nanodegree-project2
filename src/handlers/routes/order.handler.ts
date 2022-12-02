import express, { Request, Response, Router } from 'express';
import { OrderModel } from '../../models/order.model';
import verifyAuthTok from '../../middleware/verifyAuthTok.middlewear';

const order = new OrderModel();

const routes_for_orders: Router = express.Router();

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
    const ordersStored = await order.getCurrentOrderByUser(
      parseInt(req.params.user_id)
    );
    res.json(ordersStored);
  } catch (err) {
    res.sendStatus(500);
  }
};

routes_for_orders.post('/', verifyAuthTok, createOrderHandler);
routes_for_orders.get('/:user_id', verifyAuthTok, getCurrentOrderByUserHandler);

export default routes_for_orders;
