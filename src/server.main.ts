import path from "path";
import express, { Application,  Request, Response} from "express";
import bodyParser from "body-parser";
import { SERVERPORT } from "./config";
import {
  routes_for_user,
  routes_for_order,
  routes_for_products,
  routes_for_orders_products,
} from "./handlers/index.handler";

export const app: Application = express();

app.use(bodyParser.json());

routes_for_products(app);
routes_for_user(app);
routes_for_order(app);
routes_for_orders_products(app);

app.get("/", function (req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, '../assets/pages/index.html'));
});

app.listen(SERVERPORT, function () {
  console.log(`server is running on port ${SERVERPORT}...`);
});
