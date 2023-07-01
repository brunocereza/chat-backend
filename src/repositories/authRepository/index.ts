import { ILogin } from '../../shared/types/login';
import { IAuthRepository } from './type';

export class AuthRepository implements IAuthRepository {
  public async login(params: ILogin): Promise<void> {
    console.log(params);

    return;
  }
}
