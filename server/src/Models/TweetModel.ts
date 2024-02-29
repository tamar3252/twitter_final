import mongoose, { Document, Schema, Types } from "mongoose";
import {Tweet} from '../../Types/Tweet'

type TweetDocument = Tweet & Document;

const TweetSchema =new Schema<TweetDocument>({
  text: String,
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: Schema.Types.ObjectId, ref: "tweets" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "likes" }],
  dateCreated: { type: Date, default: Date.now }
})


export const TweetModel = mongoose.model<TweetDocument>("tweets", TweetSchema);
