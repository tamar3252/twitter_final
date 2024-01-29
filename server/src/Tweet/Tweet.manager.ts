import { Types } from "mongoose";
import { TweetController } from "./Tweet.controller";

const { mongoose } = require("mongoose")
const { TweetRepository } = require('./Tweet.repository')
const { Request: ExpressRequest } = require("express");
const { userManager } = require("../Users/Users.manager")
const { Tweet } = require("../../Types/Tweet")

export const TweetManager = {
    getAllTweets: async () => {
        try {
            const allTweets = await TweetRepository.getAllTweets()
            return { status: 200, value: allTweets }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    getTweetsWithFollower: async (req: typeof ExpressRequest) => {
        try {
            const followsId = (await userManager.getUserDetails(req)).value.follows

            const allTweetswithFollower = await TweetRepository.getTweetsWithFollower(followsId)
            return { status: 200, value: allTweetswithFollower }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    getTweet: async (req: typeof ExpressRequest) => {
        const tweetId = req.body.tweet_id
        try {
            const tweet = await TweetRepository.getTweet(tweetId).populate('user_id')
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
    addComment: async (req: typeof ExpressRequest) => {
        const userId = req.tokenData.user_id;
        const tweetId = req.body.tweetId
        const tweet = {
            text: req.body.text,
            user_id: userId
        }
        try {
            const commentId = (await TweetRepository.addTweet(tweet))._id
            await TweetRepository.addCommentIdToTweet(tweetId, commentId)
            return { status: 200, value: 'success' }
        }
        catch (err) {
            return { status: 500, value: err.message }
        }
    },
    // deleteTweet: async (req: typeof ExpressRequest) => {
    //     const userId = req.tokenData.user_id;
    //     const tweetId = req.params.tweet_id;
        

    //     const session = await mongoose.startSession();
    //     session.startTransaction();

    //     let tweetsComments
    //     try {
    //         const user = (await userManager.getUserDetails(req))
    //         if (!user) {
    //             return { status: 500, value: "You dont have permission to delete this tweet" }
    //         }
    //         const userRole = user.value.role;

    //         if (userRole === "admin") {
    //             const tweet: typeof Tweet = await TweetManager.getTweet(req)
    //             if (!tweet || tweet.user_id.role === "admin") {
    //                 // throw new Error("You dont have permission to delete this tweet")
    //                 return { status: 500, value: "You dont have permission to delete this tweet" }
    //             }
    //             tweetsComments = tweet.comments;
    //         }
    //         // else {
    //         //     const userTweet = await TweetModel.findOne({ user_id: userId, _id: tweetId });
    //         //     if (!userTweet) {
    //         //         throw new Error("tweet not exist")
    //         //     }
    //         //     tweetsComments = userTweet.comments;
    //         // }


    //         if (!tweetsComments || tweetsComments.length === 0) {
    //             const response=await TweetRepository.deleteTweet({ _id: tweetId });
    //             return { status: 200, value: response }
    //         }


    //         for (const commentId of tweetsComments) {
    //             const commentTweet: typeof Tweet = await TweetManager.getTweet(commentId)
    //             if (!commentTweet)
    //                 // throw new Error("comment not exist")
    //                 return { status: 500, value:"comment not exist"}
    //             await TweetRepository.deleteTweet(commentTweet._id, commentTweet.user_id);
    //         }
    //         const response = await TweetRepository.deleteTweet(tweetId)

    //         await session.commitTransaction();
    //         session.endSession();


    //         return { status: 200, value: response }


    //         // const respose = await TweetRepository.deleteTweet(tweetId, userId)
    //         // if (!respose) {
    //         //     await session.abortTransaction();
    //         //     session.endSession();
    //         //     return { status: 500, value: "You dont have permission to delete this tweet" }
    //         // }
    //         // await session.commitTransaction();
    //         // session.endSession();
    //         // return { status: 200, value: respose }
    //     }
    //     catch (err) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         return { status: 500, value: err.message }
    //     }
    // }
}

