import { ILogin } from '../../../shared/types/login';

export type IAuthController = {
  login: (params: ILogin) => Promise<void>;
};
