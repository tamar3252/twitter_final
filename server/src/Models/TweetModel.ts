import mongoose, { Document, Schema, Types } from "mongoose";
import {Tweet} from '../../Types/Tweet'

type TweetDocument = Tweet & Document;

let TweetSchema =new Schema<TweetDocument>({
  text: String,
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: Schema.Types.ObjectId, ref: "tweets" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "likes" }]
})

exports.TweetModel = mongoose.model("tweets", TweetSchema);