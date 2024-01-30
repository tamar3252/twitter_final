import { Document } from 'mongoose';
const { LikeModel } = require('../Models/LikeModel')

export const likeRepository={
    addLike : async (likeObj: Object) => {
        const like:Document = await new LikeModel(likeObj);
        await like.save();
        return like
    },
    removeLike :async (userId: Object, likeId: Object) => {
        return await LikeModel.deleteOne({ _id: likeId, user_id: userId });
    }

}