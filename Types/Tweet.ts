import { ObjectId, Types } from "mongoose";


export type Tweet = {
  _id: ObjectId |null
  text: String,
  user_id: ObjectId,
  comments: ObjectId[] | null;
  likes: ObjectId[] | null
};