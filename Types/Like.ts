import  { ObjectId } from "mongoose";


export type Like = {
    user_id:ObjectId,
    tweet_id: ObjectId,
  }