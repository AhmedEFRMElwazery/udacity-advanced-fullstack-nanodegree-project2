import express, { Request, Response, Router } from 'express';
import { ProductModel } from '../../models/product.model';
import verifyAuthToken from '../../middleware/verifyAuthTok.middlewear';

const product = new ProductModel();

const routes_for_products: Router = express.Router();

const retrieveAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await product.index();
    res.json(products);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const showAProductWithSpecificIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const retrievedProduct = await product.show(parseInt(req.params.id));
    res.json(retrievedProduct);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

const createAProductHandler = async (req: Request, res: Response) => {
  try {
    const createdProduct = await product.create(req.body);
    if (!createdProduct) {
      res.sendStatus(404);
    }
    res.json(createdProduct);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

routes_for_products.get('/', retrieveAllProductsHandler);
routes_for_products.get('/:id', showAProductWithSpecificIdHandler);
routes_for_products.post('/', verifyAuthToken, createAProductHandler);

export default routes_for_products;
