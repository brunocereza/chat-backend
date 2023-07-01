import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { loginSchema } from '../../../schema/login/index';

const authRotes = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
authRotes.post(
  '/login',
  celebrate({ [Segments.BODY]: loginSchema }),
  async (req, res) => {
    // const params: Login = req?.body;
    // const authController = new AuthController();
    // const usuario = await authController.login(params);
    return res.status(200).json({ message: 'rota vazia' });
  },
);

export default authRotes;
