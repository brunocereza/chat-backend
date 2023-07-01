import { Login } from '../../shared/types/login';

export type IUserRepository = {
  create: (params: Login) => Promise<boolean>;
};
