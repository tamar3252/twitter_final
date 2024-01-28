const { TweetModel, UesrModel } = require("../Models/TweetModel")


export const getAllTweets = async () => {
    return await TweetModel.find()
}
export const getTweetsWithFollower = async (userId: String) => {
    const tweetsWithFollower = []
    const followers = await UesrModel.findOne({ _id: userId }).follows
    for (const id of followers) {
        tweetsWithFollower.push(await TweetModel.find({ user_id: id }))
    }
    return
}

export const getTweet = async (tweetId: String) => {
    return await TweetModel.findOne({ _id: tweetId })
}

export const addTweet = async (tweetObj: Object) => {
    return await new TweetModel(tweetObj)
}

export const deleteTweet = async (tweetId: String, userId: String) => {
    let tweetsComments;
    const userRole = await UesrModel.findOne({ _id: userId }).role
    if (userRole == "admin")
        tweetsComments = await TweetModel.findOne({ user_id: !"admin", tweet_id: tweetId }).comments
    else
        tweetsComments = await TweetModel.findOne({ user_id: userId, tweet_id: tweetId }).comments
    for (const tweet of tweetsComments) {
        // await TweetModel.deleteOne({ _id: tweet })
        deleteTweet(tweet, tweet.user_id)
    };
    return await TweetModel.deleteOne(tweetId)
}




