const { mongoose } = require("mongoose")

const { getAllTweets, getTweetsWithFollower, getTweet, addTweet, addComment, deleteTweet } = require('./Tweet.repository')
const { Request: ExpressRequest } = require("express");


export const getAllTweetsFunc = async () => {
    try {
        const allTweets = await getAllTweets()
        console.log('allTweets', allTweets);
        return { status: 200, value: allTweets }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}
export const getTweetsWithFollowerFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    try {
        const allTweets = await getTweetsWithFollower(userId)
        return { status: 200, value: allTweets }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}

export const getTweetFunc = async (req: typeof ExpressRequest) => {
    const tweetId = req.body.tweet_id
    try {
        const tweet = await getTweet(tweetId)
        return { status: 200, value: tweet }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}
export const addTweetFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;

    // let tweet = req.body.tweet
    // tweet.user_id = userId
    const tweet = {
        text: req.body.text,
        user_id: userId
    }
    try {
        await addTweet(tweet)
        return { status: 200, value: tweet }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}
export const addCommentFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const tweetId = req.body.tweetId
    const comment = {
        text: req.body.text,
        user_id: userId
    }
    try {
        await addComment(comment, tweetId)
        return { status: 200, value: comment }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}
export const deleteTweetFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const tweetId = req.params.tweet_id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const respose = await deleteTweet(tweetId, userId)
        // if (!respose) {
        //     await session.abortTransaction();
        //     session.endSession();
        //     return { status: 500, value: "You dont have permission to delete this tweet" }
        // }
        await session.commitTransaction();
        session.endSession();
        return { status: 200, value: respose }
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return { status: 500, value: err.message }
    }
}

