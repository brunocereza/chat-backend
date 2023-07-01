import Joi from 'joi';

//Esquema utilizado para validar middlware
export const userSchemaValidation = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});
