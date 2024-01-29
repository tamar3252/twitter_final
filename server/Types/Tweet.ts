import { Types } from "mongoose";


export type Tweet = {
    text:String,
    user_id: Types.ObjectId,
    comments: Types.ObjectId[];
    likes: Types.ObjectId[]
  };