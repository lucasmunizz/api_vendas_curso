import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokenRepository from '../typeorm/repositories/UsersTokensRepository';
import EtherealMail from '../../../config/mail/EtherealMail';
import { resolve } from 'path';

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

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] - Redefinição de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http:localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}
