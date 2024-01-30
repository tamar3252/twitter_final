import mongoose, { Document, Schema, Types } from "mongoose";
import {Like} from '../../../Types/Like'

type LikeDocument = Like & Document

const LikeuserSchema = new Schema<LikeDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  tweet_id: { type: Schema.Types.ObjectId, ref: "tweets" },
})

exports.UserModel = mongoose.model("likes", LikeuserSchema);