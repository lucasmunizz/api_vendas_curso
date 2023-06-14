import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const sessionService = new CreateSessionService();

    const { email, password } = request.body;

    const user = sessionService.execute({ email, password });

    return response.json(user);
  }
}
