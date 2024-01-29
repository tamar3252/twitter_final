const { mongoose } = require("mongoose")
const { TweetRepository } = require('./Tweet.repository')
const { Request: ExpressRequest } = require("express");

export const TweetManager ={
    getAllTweets : async () => {
        try {
            const allTweets = await TweetRepository.getAllTweets()
            return { status: 200, value: allTweets }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    getTweetsWithFollower : async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        try {
            const allTweets = await TweetRepository.getTweetsWithFollower(userId)
            return { status: 200, value: allTweets }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    getTweet : async (req: typeof ExpressRequest) => {
        const tweetId = req.body.tweet_id
        try {
            const tweet = await TweetRepository.getTweet(tweetId)
            return { status: 200, value: tweet }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    addTweet: async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const tweet = {
            text: req.body.text,
            user_id: userId
        }
        try {
            await TweetRepository.addTweet(tweet)
            return { status: 200, value: tweet }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    addComment : async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const tweetId = req.body.tweetId
        const comment = {
            text: req.body.text,
            user_id: userId
        }
        try {
            await TweetRepository.addComment(comment, tweetId)
            return { status: 200, value: comment }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    deleteTweet : async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const tweetId = req.params.tweet_id;
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const respose = await TweetRepository.deleteTweet(tweetId, userId)
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
}

