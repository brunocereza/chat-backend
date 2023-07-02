import { NextFunction, Request, Response } from 'express';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { httpStatusCode } from '../enum/httpStatusCode ';

export const SECRET_KEY: Secret = process.env.SECRET || 'custom-secret';
export const SECRET_PRHASE: Secret = process.env.SECRET_PRHASE;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const headerValidation = async (
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
//validacao normal funcionando
// export const middlewareValidation = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { username } = req.body;
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     const tokenDeserialize = await jWebToken.deserialize(token);
//     const currentDate = new Date();
//     const expirationDate = new Date(+tokenDeserialize.exp * 1000);

//     if (currentDate > expirationDate) {
//       res
//         .status(httpStatusCode.BadRequest)
//         .json({
//           Message:
//             'Token Exprirado, faça login novamente ou informe outro token',
//         })
//         .send();
//       return;
//     }

//     const user = await userRepository.getOne(username);
//     if (!!user) {
//       res
//         .status(httpStatusCode.BadRequest)
//         .json({ Message: 'Usuário já cadastrado' })
//         .send();
//       return;
//     }

//     if (!token) {
//       throw new Error();
//     }

//     const decoded = jwt.verify(token, SECRET_KEY);
//     (req as CustomRequest).token = decoded;

//     next();
//   } catch (err) {
//     console.log('err', err);

//     res.status(httpStatusCode.Unauthorized).json({ Message: 'Invalid Token' });
//   }
// };
