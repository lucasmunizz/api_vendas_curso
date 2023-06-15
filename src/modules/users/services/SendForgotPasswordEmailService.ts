import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import UsersTokenRepository from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userTokensRepository = getCustomRepository(UsersTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const token = await userTokensRepository.generate(user.id);

    console.log(token);
  }
}
