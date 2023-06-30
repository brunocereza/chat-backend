import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { JwtType, IJWT } from './type';

export class Jwt implements IJWT {
  public async generation(params: JwtType): Promise<string> {
    const SECRET = process.env.SECRET || 'custom-secret';
    const dataUser = params;
    let jwtToken = '';
    try {
      jwtToken = jwt.sign(dataUser, SECRET, {
        expiresIn: 28800,
      });
    } catch (error) {
      throw error;
    }

    return jwtToken;
  }

  public async deserialize(jwt: string): Promise<JwtType> {
    const jwtDeserialize = jwt_decode<JwtType>(jwt);

    return jwtDeserialize;
  }
}
