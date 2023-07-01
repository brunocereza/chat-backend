import { AuthRepository } from '../../../repositories/authRepository';
import { ILogin } from '../../../shared/types/login';
import { IAuthController } from './types';
export class AuthController implements IAuthController {
  public async login(params: ILogin): Promise<void> {
    const authRepository = new AuthRepository();
    await authRepository.login(params);
  }
}
