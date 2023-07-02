import { loginParams } from '../../shared/dto/login';
import { ILogin } from '../../shared/types/login';

export type IAuthRepository = {
  login: (params: loginParams) => Promise<ILogin>;
};
