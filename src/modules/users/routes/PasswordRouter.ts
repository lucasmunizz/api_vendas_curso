import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { Segments, celebrate, Joi } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passwordRoutes;
