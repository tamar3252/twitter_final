import { ObjectId, Schema  } from "mongoose";
import { GetAll, GetOne, Tweet } from "../../../Types/Tweet";
import { AuthRequest } from "requestInterface";
import * as TweetRepository from './Tweet.repository';
import * as userManager from '../Users/Users.manager';
import { User } from "../../../Types/User";

export const getAllTweets = async (): Promise<GetAll>  => {
    const allTweets:Tweet[] = await TweetRepository.getAllTweets()
    return { status: 200, value: allTweets }
}

export const getTweetsWithFollower = async (req: AuthRequest):  Promise<GetAll>=> {
    const userDetails:{ status: number; value: User | string } = await userManager.getUserDetails(req);
    const followsId: ObjectId[] = (userDetails.value as User).follows;
    const allTweetswithFollower:Tweet[] = await TweetRepository.getTweetsWithFollower(followsId);
    return { status: 200, value: allTweetswithFollower };
};
export const getTweet = async (req: AuthRequest): Promise<GetOne> => {
    const tweetId: ObjectId = req.body.tweet_id
    const userId: ObjectId = req.tokenData.user_id
    if (userId) {
        const tweet:Tweet  = await TweetRepository.getTweet(tweetId, userId)
        return { status: 200, value: tweet }
    }
    const tweet:Tweet = await TweetRepository.getTweet(tweetId,null)
    return { status: 200, value: tweet }
}
export const addTweet = async (req: AuthRequest):  Promise<GetOne>=> {
    const userId: ObjectId = req.tokenData.user_id;
    const text: String = req.body.text

    const tweet: Tweet = {
        text: text,
        user_id: userId,
    }
    await TweetRepository.addTweet(tweet)
    return { status: 200, value: tweet }
}
export const addComment = async (req: AuthRequest):  Promise<GetOne>=> {
    const userId: ObjectId = req.tokenData.user_id;
    const tweetId: ObjectId = req.body.tweetId
    const tweet: Tweet = {
        text: req.body.text,
        user_id: userId,
    }
    const commentId: ObjectId = (await TweetRepository.addTweet(tweet))._id
    await TweetRepository.addCommentIdToTweet(tweetId, commentId)
    return { status: 200, value: 'success' }
}
// deleteTweet: async (req: AuthRequest) => {
//     const userId = req.tokenData.user_id;
//     const tweetId:ObjectId= req.params.tweet_id;


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
//             const response = await TweetRepository.deleteTweet({ _id: tweetId });
//             return { status: 200, value: response }
//         }


//         for (const commentId of tweetsComments) {
//             const commentTweet: typeof Tweet = await TweetManager.getTweet(commentId)
//             if (!commentTweet)
//                 // throw new Error("comment not exist")
//                 return { status: 500, value: "comment not exist" }
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

