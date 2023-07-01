import { UserRepository } from '../../../repositories/userRepository';
import { createUserParams } from '../../../shared/dto/user';
import { IUserController } from './types';
export class UserController implements IUserController {
  public async create(params: createUserParams): Promise<boolean> {
    const userRepository = new UserRepository();
    const response = await userRepository.create(params);
    return response;
  }
}
