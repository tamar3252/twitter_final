import { ObjectId } from "mongoose";

export type Like = {
  _id?: ObjectId 
  user_id: ObjectId,
  tweet_id: ObjectId,
}

export type AddLike = { status: number; value: Like  }
export type RemoveLike = { status: number; value: Like |ObjectId }
export type GetLike = {status:number,value:Like}
