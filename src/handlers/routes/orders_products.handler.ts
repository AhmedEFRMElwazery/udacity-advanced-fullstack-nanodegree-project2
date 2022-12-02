import express, { Request, Response, Router } from 'express';
import verifyAuthTok from '../../middleware/verifyAuthTok.middlewear';
import { OrdersProductsModel } from '../../models/orders_products.model';

const ordersAndProducts = new OrdersProductsModel();

const routes_for_orders_products: Router = express.Router();

const showAllOrdersAndProductsHandler = async (req: Request, res: Response) => {
  try {
    const retrievedOrdersProducts = await ordersAndProducts.index();
    res.json(retrievedOrdersProducts);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const showProductsForSpecificOrderIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const orderID = req.params.order_id;
    const retrievedOrdersProducts = await ordersAndProducts.show(orderID);
    res.json(retrievedOrdersProducts);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const createOrderProductsHandler = async (req: Request, res: Response) => {
  try {
    const createdOrderProduct = await ordersAndProducts.create(req.body);
    res.json(createdOrderProduct);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

routes_for_orders_products.get(
  '/products',
  verifyAuthTok,
  showAllOrdersAndProductsHandler
);
routes_for_orders_products.get(
  '/:order_id/products',
  verifyAuthTok,
  showProductsForSpecificOrderIdHandler
);
routes_for_orders_products.post(
  '/:order_id/products',
  verifyAuthTok,
  createOrderProductsHandler
);

export default routes_for_orders_products;
