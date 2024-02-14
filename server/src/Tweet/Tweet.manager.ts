import mongoose, { ObjectId, Schema } from "mongoose";
import { GetTweets, GetTweet, Tweet } from "../../../Types/Tweet";
import { AuthRequest } from "requestInterface";
import * as TweetRepository from './Tweet.repository';
import * as userManager from '../Users/Users.manager';


import { GetUserDetails, UpdateUser, User } from "../../../Types/User";

const ObjectId = require('mongoose').ObjectID;

export const getAllTweets = async (req: AuthRequest): Promise<GetTweets> => {
    const userId: ObjectId = req.tokenData?.user_id
    const allTweets: Tweet[] = await TweetRepository.getAllTweets(userId)
    return { status: 200, value: allTweets }
}

export const getTweetsWithFollower = async (req: AuthRequest): Promise<GetTweets> => {
    const userDetails: { status: number; value: User | string } = await userManager.getUserDetails(req);
    const followsId: ObjectId[] = (userDetails.value as User).follows;
    const allTweetswithFollower: Tweet[] = await TweetRepository.getTweetsWithFollower(followsId);
    return { status: 200, value: allTweetswithFollower };
};
export const getTweet = async (req: AuthRequest): Promise<GetTweet> => {
    const tweetId: ObjectId = (req.params.tweet_id) as ObjectId
    const userId: ObjectId = req.tokenData?.user_id
    if (userId) {
        const tweet: Tweet = await TweetRepository.getTweet(tweetId, userId)
        return { status: 200, value: tweet }
    }
    const tweet: Tweet = await TweetRepository.getTweet(tweetId, null)
    return { status: 200, value: tweet }
}


export const addTweet = async (req: AuthRequest): Promise<GetTweet> => {
    const userId: ObjectId = req.tokenData.user_id;
    const text: String = req.body.text
    const tweet: Tweet = {
        text: text,
        user_id: userId,
    }
    await TweetRepository.addTweet(tweet)
    return { status: 200, value: tweet }
}

export const addComment = async (req: AuthRequest): Promise<GetTweet> => {
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

export const addlike = async (tweetId: ObjectId, likeId: ObjectId): Promise<UpdateUser> => {
    // const tweetId :ObjectId= req.tokenData.user_id;
    // const likeId :ObjectId=req.body.;

    //למצוא את הלייק ולבדוק שהוא קיים
    // const like = await userRepository.findUserById(userToFollowId)
    // if (!userToFollow)
    //     return { status: 401, value: 'user to follow not found' }

    // const response:UpdateWriteOpResult =

    await TweetRepository.addLike(tweetId, likeId)

    // if (!response || response.matchedCount == 0)
    //     return { status: 401, value: 'user not found' }
    // if (response.modifiedCount == 0)
    //     return { status: 401, value: 'you already follow this user' }
    return { status: 200, value: 'success' }
}


export const removeLike = async (tweetId: ObjectId, likeId: ObjectId): Promise<UpdateUser> => {
    await TweetRepository.removeLike(tweetId, likeId)
    return { status: 200, value: 'success' }
}

export const deleteTweet = async (req: AuthRequest) => {
    const userId = req.tokenData.user_id;
    const tweetId: ObjectId = req.params.tweet_id;
    const session = await mongoose.startSession();
    session.startTransaction();
    let tweetsComments
    try {

        if (userId) {
            const user: GetUserDetails = (await userManager.getUserDetails(req))
            if (!user) {
                return { status: 500, value: "You dont have permission to delete this tweet" }
            }
            const userRole = (user.value as User).role;
            console.log(req);
            
            const tweet: GetTweet = await getTweet(req)
            console.log((tweet));

            if (userRole === "admin") {                          
                if (!tweet || ((tweet.value as Tweet).user_id as unknown as User).role === "admin") {
                    return { status: 500, value: "You dont have permission to delete this tweet" }
                }
               
            }
            tweetsComments = (tweet.value as Tweet).comments;
            // else {
            //     const userTweet = await TweetModel.findOne({ user_id: userId, _id: tweetId });
            //     if (!userTweet) {
            //         throw new Error("tweet not exist")
            //     }
            //     tweetsComments = userTweet.comments;
            // }
        }
        

        if (!tweetsComments || tweetsComments.length === 0) {
            const response = await TweetRepository.deleteTweet(tweetId, userId);
            return { status: 200, value: response }
        }


        for (const commentId of tweetsComments) {
            req.params.tweet_id = commentId as unknown as string
            req.tokenData.user_id = null
            const commentTweet: GetTweet = await getTweet(req)
            if (!commentTweet)
                return { status: 500, value: "comment not exist" }
            await TweetRepository.deleteTweet((commentTweet.value as Tweet)._id, (commentTweet.value as Tweet).user_id);
        }
        const response = await TweetRepository.deleteTweet(tweetId, userId)
        await session.commitTransaction();
        session.endSession();
        return { status: 200, value: response }


        // const respose = await TweetRepository.deleteTweet(tweetId, userId)
        // if (!respose) {
        //     await session.abortTransaction();
        //     session.endSession();
        //     return { status: 500, value: "You dont have permission to delete this tweet" }
        // }
        // await session.commitTransaction();
        // session.endSession();
        // return { status: 200, value: respose }
    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return { status: 500, value: err.message }
    }
}

