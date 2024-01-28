const { Request: ExpressRequest } = require("express");
const { addLike,removeLike } =require ("./Like.repository")


export const addLikeFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const tweetId=req.body.tweet_id

    const like={
        tweet_id:tweetId,
        user_id:userId
    }
    try {
        await addLike(like)
        return { status: 200, value: like }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}

export const removeLikeFunc=async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const likeId=req.params.tweet_id
    try {
        await removeLike(userId,likeId)
        return { status: 200, value: likeId }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}