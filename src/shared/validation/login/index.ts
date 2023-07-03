import Joi from 'joi';

export const loginValidation = Joi.object().keys({
  password: Joi.string().required(),
  username: Joi.string().required(),
});

export const refhresTokenValidation = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown();
