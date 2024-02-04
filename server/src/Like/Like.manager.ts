import { ObjectId } from "mongoose";
import { Add, Like, Remove } from "../../../Types/Like";

const { Request: ExpressRequest } = require("express");
const likeRepository = require("./Like.repository")

export const addLike = async (req: typeof ExpressRequest):Promise<Add> => {
    const userId:ObjectId = req.tokenData.user_id;
    const tweetId:ObjectId = req.body.tweet_id
    const like:Like = {
        tweet_id: tweetId,
        user_id: userId
    }
    await likeRepository.addLike(like)
    return { status: 200, value: like }

}
export const removeLike = async (req: typeof ExpressRequest):Promise<Remove>  => {
    const userId:ObjectId = req.tokenData.user_id;
    const likeId:ObjectId = req.params.tweet_id
    await likeRepository.removeLike(userId, likeId)
    return { status: 200, value: likeId }
}


