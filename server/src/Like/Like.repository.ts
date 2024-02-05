import { Document, ObjectId, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { Like } from '../../../Types/Like';
import {LikeModel} from '../Models/LikeModel'

export const addLike = async (likeObj: Like): Promise<Document<Like>>  => {
    const like:Document<Like> = await new LikeModel(likeObj);
    await like.save();
    return like
}

export const removeLike = async (userId: ObjectId, likeId: ObjectId) :Promise<DeleteResult> => {
    return await LikeModel.deleteOne({ _id: likeId, user_id: userId });
}

