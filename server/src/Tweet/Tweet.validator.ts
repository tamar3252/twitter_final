import { Request , Response ,NextFunction  } from "express";
import Joi from "joi";

export const tweetValidation = (req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object({
        text: Joi.string().required(),
    })

    const validBody = joiSchema.validate(req.body)

    if (validBody.error) {
        res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
    }
    else
        next()

}
export const commentValidation = (req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object({
        text: Joi.string().required(),
        tweetId: Joi.string().hex().length(24)
    })

    const validBody = joiSchema.validate(req.body)

    if (validBody.error) {
        res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
    }
    else
        next()

}
export const tweetIdValidation = (req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object({
        tweet_id: Joi.string().hex().length(24)
    })

    const validBody = joiSchema.validate(req.params)

    if (validBody.error) {
        res.status(400).json("ERROR: invalid details " + validBody.error.details[0].message)
    }
    else
        next()
}


