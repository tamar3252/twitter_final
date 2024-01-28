import mongoose, { Document, Schema, Types } from "mongoose";

type Like = {
  user_id: Types.ObjectId,
  tweet_id: Types.ObjectId,
}

type LikeDocument = Like & Document

let LikeuserSchema = new Schema<LikeDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  tweet_id: { type: Schema.Types.ObjectId, ref: "tweets" },
})

exports.UserModel = mongoose.model("likes", LikeuserSchema);