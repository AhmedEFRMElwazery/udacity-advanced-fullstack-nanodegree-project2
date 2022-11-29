import type { Request, Response, Application } from 'express';
import { ProductModel } from '../../models/product.model';
import verifyAuthToken from '../../middleware/verifyAuthTok.middlewear';

const product = new ProductModel();

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

const routes_for_products = (app: Application) => {
  app.get('/products', retrieveAllProductsHandler);
  app.get('/products/:id', showAProductWithSpecificIdHandler);
  app.post('/products', verifyAuthToken, createAProductHandler);
};

export default routes_for_products;
