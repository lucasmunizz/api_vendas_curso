import { Request, Response, Router } from 'express';
import productsRouter from '../../../modules/products/routes/ProductRouter';
import { request } from 'http';

const routes = Router();

routes.use('/products', productsRouter);

// routes.get('/', (request: Request, response: Response) => {
//   response.send('teste');
// });

export default routes;
