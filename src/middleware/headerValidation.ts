import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { httpStatusCode } from '../enum/httpStatusCode ';
import { userRepository } from '../repositories/userRepository';
import { jWebToken } from '../shared/jwt';

export const SECRET_KEY: Secret = process.env.SECRET || 'custom-secret';
export const SECRET_PRHASE: Secret = process.env.SECRET_PRHASE;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const headerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const secretPhraseAccess = req.header('Secret');
    if (secretPhraseAccess !== SECRET_PRHASE) {
      res
        .status(httpStatusCode.BadRequest)
        .json({ Message: 'Não tem permissão para acessar esse endpoint' })
        .send();
      return;
    }

    next();
  } catch (err) {
    res
      .status(httpStatusCode.Unauthorized)
      .json({ Message: 'Permission Negada' });
  }
};
export const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res
        .status(httpStatusCode.BadRequest)
        .json({ Message: 'Token não informado' })
        .send();
      return;
    }

    const { username } = await jWebToken.deserialize(token);
    const user = await userRepository.getOneByName(username);
    if (!user) {
      res
        .status(httpStatusCode.BadRequest)
        .json({ Message: 'Usuário não encontrado' })
        .send();
      return;
    }

    next();
  } catch (err) {
    res
      .status(httpStatusCode.Unauthorized)
      .json({ Message: 'Permission Negada' });
  }
};
