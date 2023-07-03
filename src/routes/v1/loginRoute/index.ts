import { Segments, celebrate } from 'celebrate';
import { Router, Request, Response } from 'express';
import { authController } from '../../../controllers/v1/authController';
import {
  headerMiddleware,
  refreshTokenMiddleware,
} from '../../../middleware/headerValidation';
import { passport } from '../../../middleware/login';

import { loginParams } from '../../../shared/dto/login';
import { jWebToken } from '../../../shared/jwt';
import {
  loginValidation,
  refhresTokenValidation,
} from '../../../shared/validation/login';

const loginRotes = Router();

loginRotes.post(
  '/login',
  celebrate({ [Segments.BODY]: loginValidation }),
  passport.authenticate('login', {
    session: false,
  }),
  async (req: Request, res: Response) => {
    const params: loginParams = req.body;
    const access_token = await authController.generateJWT(params.username);
    return res.status(200).json({
      access_token,
      token_type: 'Bearer',
      user: {
        name: params.username,
      },
    });
  },
);

loginRotes.get(
  '/refreshToken',
  celebrate({ [Segments.HEADERS]: refhresTokenValidation }),
  refreshTokenMiddleware,
  async (req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const { username } = await jWebToken.deserialize(token);
    return res.status(200).json({ user: { name: username } });
  },
);

loginRotes.get(
  '/getToken',
  headerMiddleware,
  async (req: Request, res: Response) => {
    const access_token = await authController.generateGenericJWT();
    return res.status(200).json({ access_token, token_type: 'Bearer' });
  },
);

export default loginRotes;
