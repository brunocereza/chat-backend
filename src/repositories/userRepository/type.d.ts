import { createUserParams } from '../../shared/dto/user';
import { IUser } from '../../shared/types/user';

export type IUserRepository = {
  create: (params: createUserParams) => Promise<boolean>;
  getOneByName(username: string): Promise<IUser>;
};
