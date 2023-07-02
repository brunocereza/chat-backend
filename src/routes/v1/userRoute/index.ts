import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
// import { createUserMiddleware } from '../../../middleware/createUser';
import { userController } from '../../../controllers/v1/userController';
import passport from '../../../middleware/user';
import { createUserParams } from '../../../shared/dto/user';
import { createUserValidation } from '../../../shared/validation/user';

const userRoute = Router();

//Implementar passport.js
userRoute.post(
  '/create',
  celebrate({ [Segments.BODY]: createUserValidation }),
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res) => {
    const params: createUserParams = req?.body;
    const usuario = await userController.create(params);
    return res.status(usuario ? 200 : 400).json({
      message: usuario
        ? 'Usuário criado com sucesso!'
        : 'Erro ao criar usuário',
    });
  },
);

export default userRoute;
