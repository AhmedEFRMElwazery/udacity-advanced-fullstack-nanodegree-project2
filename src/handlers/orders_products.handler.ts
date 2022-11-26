import express, { Request, Response } from "express";
import verifyAuthTok from "../middleware/verifyAuthTok.middlewear";
import { OrdersProductsModel } from "../models/orders_products.model";

const ordersAndProducts = new OrdersProductsModel();

const showAllOrdersAndProductsHandler = async (req: Request, res: Response) => {
  try {
    const retrievedOrdersProducts = await ordersAndProducts.index();
    res.json(retrievedOrdersProducts);
  } catch (error) {
    res.sendStatus(500).send(`${error}`);
  }
};

const showProductsForSpecificOrderIdHandler = async (req: Request, res: Response) => {
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

const routes_for_orders_products = (app: express.Application) => {
  app.get("/orders/products", verifyAuthTok, showAllOrdersAndProductsHandler);
  app.get("/orders/:order_id/products", verifyAuthTok, showProductsForSpecificOrderIdHandler);
  app.post("/orders/:order_id/products", verifyAuthTok, createOrderProductsHandler);
};

export default routes_for_orders_products;
