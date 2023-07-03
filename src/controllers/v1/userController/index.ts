import { userRepository } from '../../../repositories/userRepository';
import { createUserParams } from '../../../shared/dto/user';
import { IUser } from '../../../shared/types/user';
import { IUserController } from './types';
class UserController implements IUserController {
  public async create(params: createUserParams): Promise<boolean> {
    const response = await userRepository.create(params);
    return response;
  }

  public async getOneByName(filter: string): Promise<IUser> {
    const user = await userRepository.getOneByName(filter);
    return user;
  }
}
export const userController = new UserController();
