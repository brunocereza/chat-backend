import { authRepository } from '../../../repositories/authRepository';
import { userRepository } from '../../../repositories/userRepository';
import { loginParams } from '../../../shared/dto/login';
import { jWebToken } from '../../../shared/jwt/index';
import { ILogin } from '../../../shared/types/login';
import { IAuthController } from './types';

class AuthController implements IAuthController {
  public async login(params: loginParams): Promise<ILogin> {
    const user = await authRepository.login(params);

    return user;
  }
  public async generateJWT(username: string): Promise<string> {
    const { _id } = await userRepository.getOne(username);

    const token = await jWebToken.generation({ username, _id });
    return token;
  }

  public async generateGenericJWT(): Promise<string> {
    const token = await jWebToken.generationGenericToken();
    return token;
  }
}

export const authController = new AuthController();
