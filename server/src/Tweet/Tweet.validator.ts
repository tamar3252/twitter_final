const Joi = require("joi");
const { Request: ExpressRequest, respose: ExpressResponse, next: ExpressNext } = require("express");


export const tweetValidation = (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {
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
export const commentValidation = (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {
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
export const tweetIdValidation = (req: typeof ExpressRequest, res: typeof ExpressResponse, next: typeof ExpressNext) => {
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


