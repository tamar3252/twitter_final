import  { Types } from "mongoose";


export type Like = {
    user_id: Types.ObjectId,
    tweet_id: Types.ObjectId,
  }