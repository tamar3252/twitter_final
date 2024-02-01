import { Document } from 'mongoose';
import { Like } from '../../../Types/Like';
const { LikeModel } = require('../Models/LikeModel')

export const addLike = async (likeObj: Object): Promise<Like>  => {
    const like = await new LikeModel(likeObj);
    await like.save();
    return like
}
export const removeLike = async (userId: Object, likeId: Object) :Promise<Like> => {
    return await LikeModel.deleteOne({ _id: likeId, user_id: userId });
}

