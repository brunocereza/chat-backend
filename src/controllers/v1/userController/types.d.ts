import { IUser } from '../../../shared/types/user';

export type IUserController = {
  create: (params: IUser) => Promise<boolean>;
  getOneByName(filter: string): Promise<IUser>;
};
