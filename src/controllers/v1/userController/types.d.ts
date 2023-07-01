import { IUser } from '../../../shared/types/user';

export type IUserController = {
  create: (params: IUser) => Promise<boolean>;
};
