import { DatabaseManager } from '../../database/connection';
import { UserModel } from '../../schema/user';
import { loginParams } from '../../shared/dto/login';
import { ILogin } from '../../shared/types/login';
import { IAuthRepository } from './type';

class AuthRepository implements IAuthRepository {
  public async login({ username, password }: loginParams): Promise<ILogin> {
    try {
      const databaseManagare = new DatabaseManager();
      await databaseManagare.connectInit();

      const user = await UserModel.findOne(
        {
          username,
          password,
        },
        { username },
      );

      return user;
    } catch (error) {
      //adicionar tratamento de erros
      throw error;
    }
  }
}

export const authRepository = new AuthRepository();
