import { Document, ObjectId } from 'mongoose';
import { Like } from '../../../Types/Like';
const { LikeModel } = require('../Models/LikeModel')

export const addLike = async (likeObj: Like): Promise<Document<Like>>  => {
    const like:Document<Like> = await new LikeModel(likeObj);
    await like.save();
    return like
}
export const removeLike = async (userId: ObjectId, likeId: ObjectId) :Promise<Like> => {
    return await LikeModel.deleteOne({ _id: likeId, user_id: userId });
}

