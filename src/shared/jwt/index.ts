import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { JwtType, IJWT, JwtProps } from './type';

class JWebToken implements IJWT {
  public async generation(params: JwtProps): Promise<string> {
    const SECRET = process.env.SECRET;
    const dataUser = {
      username: params.username,
      userId: params._id,
    };
    let jwtToken = '';
    try {
      jwtToken = jwt.sign(dataUser, SECRET, {
        expiresIn: '5h',
      });
    } catch (error) {
      throw error;
    }

    return jwtToken;
  }

  public async generationGenericToken(): Promise<string> {
    const SECRET_PHRASE = process.env.SECRET_PRHASE;

    let jwtToken = '';
    try {
      jwtToken = jwt.sign({}, SECRET_PHRASE, {
        expiresIn: '1s',
      });
    } catch (error) {
      console.log(error, 'ERROOOR');

      throw error;
    }
    return jwtToken;
  }

  public async deserialize(jwt: string): Promise<JwtType> {
    const jwtDeserialize = jwt_decode<JwtType>(jwt);

    return jwtDeserialize;
  }
}
export const jWebToken = new JWebToken();
