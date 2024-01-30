import { Request , Response ,NextFunction  } from "express";
import Joi from "joi";


export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object({
    full_name: {
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
    },
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(200).required(),
    role: Joi.string().valid("admin", "professional", "client")
  })
  const validBody = joiSchema.validate(req.body)

  if (validBody.error) {
    res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
  }
  else
    next()

}
export const loginValidation = (req: Request, res: Response, next: NextFunction) => {

  const joiSchema = Joi.object({
    email: Joi.string().email().max(99).required(),
    password: Joi.string().min(3).max(99).required()
  })

  const validBody = joiSchema.validate(req.body)

  if (validBody.error) {
    res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
  }
  else
    next()
}
export const followerIdValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object({
    follow_id: Joi.string().hex().length(24)
  })

  const validBody = joiSchema.validate(req.params)

  if (validBody.error) {
    res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
  }
  else
    next()
}






