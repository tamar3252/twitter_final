import { ObjectId } from "mongoose";

export type Like = {
  user_id: ObjectId,
  tweet_id: ObjectId,
}

export type AddLike = { status: number; value: Like  }
export type RemoveLike = { status: number; value: Like |ObjectId }
