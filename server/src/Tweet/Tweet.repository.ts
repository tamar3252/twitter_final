const { TweetModel } = require("../Models/TweetModel")
const { UserModel } = require("../Models/UserModel")


export const getAllTweets = async () => {
    return await TweetModel.find()
}
export const getTweetsWithFollower = async (userId: String) => {
    const tweetsWithFollower = []
    const followers = (await UserModel.findOne({ _id: userId })).follows
    for (const id of followers) {
        tweetsWithFollower.push(await TweetModel.find({ user_id: id }))
    }
    return tweetsWithFollower
}

export const getTweet = async (tweetId: String) => {
    return await TweetModel.findOne({ _id: tweetId })
}

export const addTweet = async (tweetObj: Object) => {
    let tweet = await new TweetModel(tweetObj);
    await tweet.save();
    return tweet
}
export const addComment = async (commentObj: Object, tweetId: String) => {
    const tweet = await addTweet(commentObj)
    await tweet.save();
    await TweetModel.updateOne({ _id: tweetId }, { $addToSet: { comments: tweet._id } })
}

// export const deleteTweet = async (tweetId: String, userId: String) => {

//     let tweetsComments;
//     const userRole = (await UserModel.findOne({ _id: userId })).role
//     if (userRole == "admin") {
//         tweetsComments = await TweetModel.findOne({ _id: tweetId })
//         if ((await tweetsComments.populate('user_id')).user_id.role == "admin")
//             return

//         tweetsComments = tweetsComments.comments

//     }
//     else {
//         tweetsComments = await TweetModel.findOne({ user_id: userId, tweet_id: tweetId }).comments
//     }

//     if (tweetsComments.length > 0)
//     {
//         console.log(tweetsComments);
//         for (const tweetId of tweetsComments) {
//             const tweet = await TweetModel.findOne({ _id: tweetId })
//             deleteTweet(tweet._id, tweet.user_id)
//         };

//     }
//     return await TweetModel.deleteOne({ _id: tweetId })
// }

export const deleteTweet = async (tweetId: String, userId: String) => {
    let tweetsComments;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        throw new Error("You dont have permission to delete this tweet")
    }

    const userRole = user.role;
    if (userRole === "admin") {
        const tweet = await TweetModel.findOne({ _id: tweetId }).populate('user_id');
        if (!tweet || tweet.user_id.role === "admin") {
            throw new Error("You dont have permission to delete this tweet")
        }
        tweetsComments = tweet.comments;
    }
    else {
        const userTweet = await TweetModel.findOne({ user_id: userId, _id: tweetId });
        if (!userTweet) {
            throw new Error("tweet not exist")
        }
        tweetsComments = userTweet.comments;
    }

    if (!tweetsComments || tweetsComments.length === 0) {
        return await TweetModel.deleteOne({ _id: tweetId });
    }


    for (const commentId of tweetsComments) {
        const commentTweet = await TweetModel.findOne({ _id: commentId });
        if (!commentTweet)
            throw new Error("comment not exist")
        await deleteTweet(commentTweet._id, commentTweet.user_id);
    }
    return await TweetModel.deleteOne({ _id: tweetId });
}


//65b6514fc94ab32f11cca63e



