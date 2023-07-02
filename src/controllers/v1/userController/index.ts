import { userRepository } from '../../../repositories/userRepository';
import { createUserParams } from '../../../shared/dto/user';
import { IUserController } from './types';
class UserController implements IUserController {
  public async create(params: createUserParams): Promise<boolean> {
    const response = await userRepository.create(params);
    return response;
  }
}

export const userController = new UserController();
