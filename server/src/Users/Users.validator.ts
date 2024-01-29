import mongoose from "mongoose";
const Joi = require("joi");
const { Request: ExpressRequest, respose: ExpressResponse, next: ExpressNext } = require("express");

export const userValidation = {

  signupValidation: (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {
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

  },
  loginValidation: (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {

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
  },
  followerIdValidation: (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {
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
}





