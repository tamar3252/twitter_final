import { ObjectId } from "mongoose";
import { AddLike, GetLike, Like, RemoveLike } from "../../../Types/Like";

import { AuthRequest } from "requestInterface";
import * as likeRepository from './Like.repository'
import * as tweetManager from '../Tweet/Tweet.manager'

const ObjectId = require('mongoose').ObjectID;

export const addLike = async (req: AuthRequest): Promise<AddLike> => {
    const userId: ObjectId = req.tokenData.user_id;
    const tweetId: ObjectId = req.body.tweet_id
    const like: Like = {
        tweet_id: tweetId,
        user_id: userId
    }


    const likeId = (await likeRepository.addLike(like))._id
    await tweetManager.addlike(tweetId, likeId)

    return { status: 200, value: likeId }
}

export const removeLike = async (req: AuthRequest): Promise<RemoveLike> => {
    const userId: ObjectId = req.tokenData.user_id;
    const tweetId: ObjectId = (req.params.tweet_id) as ObjectId
    const likeId: ObjectId = (req.params.like_id) as ObjectId
    const res = await likeRepository.removeLike(userId, likeId)
    await tweetManager.removeLike(tweetId, likeId)
    return { status: 200, value: likeId }
}

export const getLike = async (req: AuthRequest): Promise<GetLike> => {
    const userId: ObjectId = req.tokenData.user_id;
    const tweetId: ObjectId = (req.params.tweet_id) as ObjectId
    const res: Like = await likeRepository.getLike(userId, tweetId)
    return { status: 200, value: res }
}


