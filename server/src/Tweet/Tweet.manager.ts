const { getAllTweets, getTweetsWithFollower, getTweet, addTweet,deleteTweet } = require('./Tweet.repository')
const { Request: ExpressRequest } = require("express");


export const getAllTweetsFunc = async () => {
    try {
        const allTweets = await getAllTweets()
        console.log('allTweets',allTweets);
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

export const getTweetFunc = async () => {
    try {
        const tweet = await getTweet()
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
    const tweet={
        text:req.body.text,
        user_id:userId
    }
    try {
        await addTweet(tweet)
        return { status: 200, value: tweet }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}
export const deleteTweetFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    let tweetId = req.body.tweetId
    try {
        const respose= await deleteTweet(tweetId,userId)
        if(!respose){
            return { status: 500, value: "You dont have permission to delete this tweet" }
        }
        return { status: 200, value: respose }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}

