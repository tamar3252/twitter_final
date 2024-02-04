import { ObjectId } from "mongoose";

export type Like = {
  user_id: ObjectId,
  tweet_id: ObjectId,
}

export type Add = { status: number; value: Like  }
export type Remove = { status: number; value: Like |ObjectId }
