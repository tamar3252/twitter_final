import { TweetModel } from "../Models/TweetModel";
import { Tweet } from "../../../Types/Tweet";
import { ObjectId } from 'mongoose';


export const getAllTweets = async (): Promise<Tweet[]> => {
    return await TweetModel.find().populate('user_id')
}
export const getTweetsWithFollower = async (follows: ObjectId[]): Promise<Tweet[]> => {
    return await TweetModel.find({ user_id: { $in: follows } }).populate('user_id')
}
export const getTweet = async (tweetId: ObjectId, userId: ObjectId): Promise<Tweet> => {
    if (userId)///
        return await TweetModel.findOne({ user_id: userId, _id: tweetId }).populate('user_id').exec()
  return await TweetModel.findOne({ _id: tweetId }).populate('user_id').exec()
}

export const addTweet = async (tweetObj: Object): Promise<Tweet> => {
    const tweet = await new TweetModel(tweetObj);
    await tweet.save();
    return tweet
}
export const addCommentIdToTweet = async (tweetId: ObjectId, commentId: ObjectId): Promise<void> => {
    await TweetModel.updateOne({ _id: tweetId }, { $addToSet: { comments: commentId } })
}

export const addLike = async (tweetId:ObjectId ,liketId: ObjectId): Promise<void> => {
    await TweetModel.updateOne({ _id: tweetId }, { $addToSet: { likes: liketId } })
}

export const deleteTweet = async (tweetId: ObjectId, userId: ObjectId) => {
    return await TweetModel.deleteOne({ _id: tweetId });

    //     let tweetsComments;

    //     const user = await UserModel.findOne({ _id: userId });
    //     if (!user) {
    //         throw new Error("You dont have permission to delete this tweet")
    //     }

    //     const userRole = user.role;
    //     if (userRole === "admin") {
    //         const tweet = await TweetModel.findOne({ _id: tweetId }).populate('user_id');
    //         if (!tweet || tweet.user_id.role === "admin") {
    //             throw new Error("You dont have permission to delete this tweet")
    //         }
    //         tweetsComments = tweet.comments;
    //     }
    //     else {
    //         const userTweet = await TweetModel.findOne({ user_id: userId, _id: tweetId });
    //         if (!userTweet) {
    //             throw new Error("tweet not exist")
    //         }
    //         tweetsComments = userTweet.comments;
    //     }

    //     if (!tweetsComments || tweetsComments.length === 0) {
    //         return await TweetModel.deleteOne({ _id: tweetId });
    //     }


    //     for (const commentId of tweetsComments) {
    //         const commentTweet = await TweetModel.findOne({ _id: commentId });
    //         if (!commentTweet)
    //             throw new Error("comment not exist")
    //         await TweetRepository.deleteTweet(commentTweet._id, commentTweet.user_id);
    //     }
    //     return await TweetModel.deleteOne({ _id: tweetId });
    // }
}

