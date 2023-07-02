/* eslint-disable @typescript-eslint/no-var-requires */

import { Secret } from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import { jWebToken } from '../shared/jwt';

export const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

export const SECRET_PRHASE: Secret = process.env.SECRET_PRHASE;

passport.use(
  new localStrategy({ passReqToCallback: true }, async function (
    req,
    username,
    password,
    done,
  ) {
    const secretPhraseAccess = req.header('Secret');

    const token = req.header('Authorization')?.replace('Bearer ', '');
    const tokenDeserialize = await jWebToken.deserialize(token);
    const currentDate = new Date();
    const expirationDate = new Date(+tokenDeserialize.exp * 1000);
    if (currentDate > expirationDate) {
      return done(null, false, {
        message: 'Token expirou, faça login novamente ou informe outro',
      });
    }

    if (secretPhraseAccess !== SECRET_PRHASE) {
      return done(null, false, {
        message: 'Você não tem permissão para acessar esse endpoint',
      });
    }

    const user = await userRepository.getOne(username);
    if (user) {
      return done(null, false, { message: 'Usuário já cadastrado' });
    }
    return done(null, {});
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
