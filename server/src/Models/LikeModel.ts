import mongoose, { Document, Schema, Types } from "mongoose";
import {Like} from '../../Types/Like'

type LikeDocument = Like & Document


const LikeSchema = new Schema<LikeDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  tweet_id: { type: Schema.Types.ObjectId, ref: "tweets" },
})



export const LikeModel = mongoose.model<LikeDocument>("likes", LikeSchema);

// exports.UserModel = mongoose.model("users", userSchema);

