const { Request: ExpressRequest, respose: ExpressResponse } = require("express");
const TweetManager = require('./Tweet.manager');

export const getAllTweets = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.getAllTweets().catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getTweetsWithFollower = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.getTweetsWithFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getTweet = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.getTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const addTweet = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.addTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const addComment = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.addComment(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const deleteTweet = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await TweetManager.deleteTweet(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}


