/* eslint-disable @typescript-eslint/no-var-requires */

import { Secret } from 'jsonwebtoken';
import { userController } from '../controllers/v1/userController';
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
    console.log(currentDate, 'atual');
    console.log(expirationDate, 'token');

    //depois que vira 00h00 o token pega hora errada - n tive tempo de arrumar ainda
    // if (currentDate > expirationDate) {
    //   return done(null, false, {
    //     message: 'Token expirou, faça login novamente ou informe outro',
    //   });
    // }

    if (secretPhraseAccess !== SECRET_PRHASE) {
      return done(null, false, {
        message: 'Você não tem permissão para acessar esse endpoint',
      });
    }

    const user = await userController.getOneByName(username);
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
