import { DatabaseManager } from '../../database/connection';
import { UserModel } from '../../schema/user';
import { createUserParams } from '../../shared/dto/user';
import { generateHash } from '../../shared/encrypt';
import { IUser } from '../../shared/types/user';
import { IUserRepository } from './type';

const SALT_HASH = process.env.SALT_HASH;

class UserRepository implements IUserRepository {
  public async create(params: createUserParams): Promise<boolean> {
    try {
      const databaseManagare = new DatabaseManager();
      await databaseManagare.connectInit();

      const user = new UserModel({
        name: params.name,
        password: await generateHash(params.password, parseInt(SALT_HASH)),
        username: params.username,
        status: false,
      });
      const response = await user.save();

      return !!response._id;
    } catch (error) {
      //adicionar tratamento de erros
      throw error;
    }
  }

  public async getOneByName(username: string): Promise<IUser> {
    try {
      const databaseManagare = new DatabaseManager();
      await databaseManagare.connectInit();

      const user = await UserModel.findOne({ username });

      return user;
    } catch (error) {
      //adicionar tratamento de erros
      throw error;
    }
  }
}

export const userRepository = new UserRepository();
