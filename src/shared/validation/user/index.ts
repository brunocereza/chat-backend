import Joi from 'joi';

export const createUserValidation = Joi.object().keys({
  password: Joi.string().required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
});
