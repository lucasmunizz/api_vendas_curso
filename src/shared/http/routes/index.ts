import { Request, Response, Router } from 'express';
import productsRouter from '../../../modules/products/routes/ProductRouter';
import usersRouter from '../../../modules/users/routes/UserRouter';
import { request } from 'http';
import sessionRoutes from '../../../modules/users/routes/SessionRouter';
import passwordRoutes from '../../../modules/users/routes/PasswordRouter';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);
// routes.get('/', (request: Request, response: Response) => {
//   response.send('teste');
// });

export default routes;
