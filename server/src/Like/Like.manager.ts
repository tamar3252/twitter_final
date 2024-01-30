const { Request: ExpressRequest } = require("express");
const likeRepository = require("./Like.repository")

export const addLike = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const tweetId = req.body.tweet_id
    const like = {
        tweet_id: tweetId,
        user_id: userId
    }
    await likeRepository.addLike(like)
    return { status: 200, value: like }

}
export const removeLike = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const likeId = req.params.tweet_id
    await likeRepository.removeLike(userId, likeId)
    return { status: 200, value: likeId }
}


