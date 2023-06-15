import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const routes = Router();

const userController = new UserController();

routes.get('/', isAuthenticated, userController.index);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default routes;
