import routes_for_products from './routes/product.handler';
import routes_for_orders_products from './routes/orders_products.handler';
import express, { Request, Response, Router } from 'express';
import path from 'path';
import routes_for_orders from './routes/order.handler';
import routes_for_users from './routes/user.handler';

const mainRoute: Router = express.Router();

mainRoute.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../assets/pages/routes.html'));
});

mainRoute.use('/orders', routes_for_orders);
mainRoute.use('/products', routes_for_products);
mainRoute.use('/users', routes_for_users);
mainRoute.use('/orders', routes_for_orders_products);

export default mainRoute;
