import path from 'path';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { SERVERPORT } from './config';
import {
  routes_for_user,
  routes_for_order,
  routes_for_products,
  routes_for_orders_products,
} from './handlers/index.handler';
import logger from './middleware/logger.module';
import { rateLimit } from 'express-rate-limit';

export const app: Application = express();

app.use(bodyParser.json());
app.use(logger);
app.use(
  rateLimit({
    windowMs: 11 * 60 * 1000, // Limit the request window to 11 minutes per IP address
    max: 50, // Allow each IP address to make 50 requests per window (i.e. per 11 minutes, in our case)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      'Too many requests were made from your IP Address in such a short window of time...Please try again after 11 minutes',
  })
);

routes_for_products(app);
routes_for_user(app);
routes_for_order(app);
routes_for_orders_products(app);

app.get('/', function (req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, '../assets/pages/index.html'));
});

app.listen(SERVERPORT, function () {
  console.log(`server is running on port ${SERVERPORT}...`);
});
