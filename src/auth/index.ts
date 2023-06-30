import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { httpStatusCode } from '../enum/httpStatusCode ';

export const SECRET_KEY: Secret = process.env.SECRET || 'custom-secret';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(httpStatusCode.Unauthorized).json({ Message: 'Invalid Token' });
  }
};
