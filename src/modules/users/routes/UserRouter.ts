import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';
import uploadConfig from '../../../config/upload';

const upload = multer(uploadConfig);

const routes = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

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

routes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
