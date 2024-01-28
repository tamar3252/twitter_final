const Joi = require("joi");

export const userValidation = (reqBody: Object) => {
  let joiSchema = Joi.object({
    full_name: {
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
    },
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(200).required(),
    role: Joi.string().valid("admin", "professional", "client")
  })
  return joiSchema.validate(reqBody);
}

export const loginValidation = (reqBody: Object) => {

  let joiSchema = Joi.object({
    email: Joi.string().email().max(99).required(),
    password: Joi.string().min(3).max(99).required()
  })

  return joiSchema.validate(reqBody);
}






