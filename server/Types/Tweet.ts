import {ObjectId, Types } from "mongoose";


export type Tweet = {
    text:String,
    user_id: ObjectId,
    comments: ObjectId[]|null;
    likes: ObjectId[]|null
  };