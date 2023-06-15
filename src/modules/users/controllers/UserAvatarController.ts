import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userAvatarService = new UpdateUserAvatarService();

    const user = await userAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });

    return response.json(user);
  }
}
