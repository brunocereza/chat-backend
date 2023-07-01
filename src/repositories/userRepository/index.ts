import { DatabaseManager } from '../../database/connection';
import { User } from '../../models/user';
import { createUserParams } from '../../shared/dto/user';
import { IUserRepository } from './type';

export class UserRepository implements IUserRepository {
  public async create(params: createUserParams): Promise<boolean> {
    console.log(params);

    try {
      const databaseManagare = new DatabaseManager();
      await databaseManagare.connectInit();

      const user = new User({
        name: params.name,
        password: params.password,
        username: params.username,
        status: false,
      });
      const response = await user.save();
      console.log(response, 'response');
      return !!response._id;
    } catch (error) {
      //adicionar tratamento de erros
      throw error;
    }
  }
}
