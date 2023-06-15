import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import authConfig from '../../../config/auth';

interface ITokenRequest {
  sub: string;
  exp: number;
  iat: number;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Jwt is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenRequest;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('invalid JWT');
  }
}
