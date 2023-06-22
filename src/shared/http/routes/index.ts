import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/ProductRouter';
import usersRouter from '../../../modules/users/routes/UserRouter';
import sessionRoutes from '../../../modules/users/routes/SessionRouter';
import passwordRoutes from '../../../modules/users/routes/PasswordRouter';
import profileRoutes from '../../../modules/users/routes/ProfileRouter';
import customerRouter from '../../../modules/customers/routes/CustomerRouter';
import orderRouter from '../../../modules/orders/routes/OrderRouter';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);

export default routes;
