import { loginParams } from '../../../shared/dto/login';
import { ILogin } from '../../../shared/types/login';

export type IAuthController = {
  login: (params: loginParams) => Promise<ILogin>;
};
