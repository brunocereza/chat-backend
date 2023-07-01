import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  user: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});
