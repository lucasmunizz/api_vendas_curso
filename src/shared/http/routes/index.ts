import { Request, Response, Router } from 'express';
import productsRouter from '../../../modules/products/routes/ProductRouter';
import usersRouter from '../../../modules/users/routes/UserRouter';
import { request } from 'http';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

// routes.get('/', (request: Request, response: Response) => {
//   response.send('teste');
// });

export default routes;
