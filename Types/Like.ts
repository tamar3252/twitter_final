import  { ObjectId } from "mongoose";

//jjjjjjj
export type Like = {
    user_id:ObjectId,
    tweet_id: ObjectId,
  }