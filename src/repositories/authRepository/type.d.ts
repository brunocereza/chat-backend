import { Login } from '../../shared/types/login';

export type IAuthRepository = {
  login: (params: Login) => Promise<void>;
};
