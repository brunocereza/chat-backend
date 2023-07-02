import { Segments, celebrate } from 'celebrate';
import { Router, Request, Response } from 'express';
import { authController } from '../../../controllers/v1/authController';
import { headerValidation } from '../../../middleware/headerValidation';
import { passport } from '../../../middleware/login';

import { loginSchema } from '../../../schema/login/index';
import { loginParams } from '../../../shared/dto/login';

const loginRotes = Router();

loginRotes.post(
  '/login',
  celebrate({ [Segments.BODY]: loginSchema }),
  passport.authenticate('login', {
    session: false,
  }),
  async (req: Request, res: Response) => {
    const params: loginParams = req.body;
    const access_token = await authController.generateJWT(params.username);
    return res.status(200).json({ access_token, token_type: 'Bearer' });
  },
);

loginRotes.get(
  '/getToken',
  headerValidation,
  async (req: Request, res: Response) => {
    const access_token = await authController.generateGenericJWT();
    return res.status(200).json({ access_token, token_type: 'Bearer' });
  },
);

export default loginRotes;
