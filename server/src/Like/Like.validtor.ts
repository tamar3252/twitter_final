import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const likeValidation = (req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object({
        user_id: Joi.string().hex().length(24),
        tweet_id: Joi.string().hex().length(24)
    })

    const validBody = joiSchema.validate(req.body)

    if (validBody.error) {
        res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
    }
    next()
}