import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserService = new ShowProfileService();

    const user = showUserService.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateUserService = new UpdateProfileService();

    const updatedUser = updateUserService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(updatedUser);
  }
}
