import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  password: Joi.string().required(),
  username: Joi.string().required(),
});
