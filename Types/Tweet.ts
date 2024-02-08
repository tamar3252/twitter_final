import { ObjectId } from "mongoose";

export type Tweet = {
  _id?: ObjectId 
  text: String,
  user_id: ObjectId,
  comments?: ObjectId[] ,
  likes?: ObjectId[]
};


export type GetTweets = { status: number; value: Tweet[] | string }
export type GetTweet = { status: number; value: Tweet | string }
