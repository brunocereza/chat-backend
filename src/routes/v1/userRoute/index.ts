import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../../../controllers/v1/userController';
import { userSchemaValidation } from '../../../schema/validate/user';
import { createUserParams } from '../../../shared/dto/user';

const userRoute = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
userRoute.post(
  '/create',
  celebrate({ [Segments.BODY]: userSchemaValidation }),
  async (req, res) => {
    const params: createUserParams = req?.body;
    const sserController = new UserController();
    const usuario = await sserController.create(params);
    return res.status(usuario ? 200 : 400).json({
      message: usuario
        ? 'Usuário criado com sucesso!'
        : 'Erro ao criar usuário',
    });
  },
);

export default userRoute;
