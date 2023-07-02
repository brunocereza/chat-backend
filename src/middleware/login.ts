/* eslint-disable @typescript-eslint/no-var-requires */
import { userRepository } from '../repositories/userRepository';
import { compareHash } from '../shared/encrypt';
export const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, cb) => {
      try {
        const user = await userRepository.getOne(username);

        if (!user) {
          return cb(null, false, { message: 'User not found' });
        }
        const validate = await compareHash(password, user.password);

        if (!validate) {
          return cb(null, false, { message: 'Wrong Password' });
        }

        return cb(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return cb(error);
      }
    },
  ),
);

export default passport;
