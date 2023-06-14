import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { Segments, celebrate, Joi } from 'celebrate';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRoutes;
