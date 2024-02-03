import { ObjectId } from "mongoose";

export type Tweet = {
  _id?: ObjectId 
  text: String,
  user_id: ObjectId,
  comments?: ObjectId[] ,
  likes?: ObjectId[]
};


export type GetAll = { status: number; value: Tweet[] | string }
export type GetOne = { status: number; value: Tweet | string }
