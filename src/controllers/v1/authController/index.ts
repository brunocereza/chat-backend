import { IAuthController } from './types';
export class AuthController implements IAuthController {
  public async login(params: string): Promise<void> {
    console.log(params);
  }
}
