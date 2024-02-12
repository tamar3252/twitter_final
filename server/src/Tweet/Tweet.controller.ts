import { Request , Response   } from "express";
import { GetTweets, GetTweet } from "../../../Types/Tweet";
const TweetManager = require('./Tweet.manager');

export const getAllTweets = async (req: Request, res: Response):Promise<void> => {
    const respose:GetTweets = await TweetManager.getAllTweets(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getTweetsWithFollower = async (req: Request, res: Response):Promise<void> => {
    const respose:GetTweets = await TweetManager.getTweetsWithFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getTweet = async (req: Request, res: Response):Promise<void> => {
    const respose:GetTweet = await TweetManager.getTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const addTweet = async (req: Request, res: Response):Promise<void> => {
    const respose:GetTweet = await TweetManager.addTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const addComment = async (req: Request, res: Response):Promise<void> => {
    const respose:GetTweet = await TweetManager.addComment(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const deleteTweet = async (req: Request, res: Response):Promise<void> => {
    const respose = await TweetManager.deleteTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}


