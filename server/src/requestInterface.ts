import { Request } from "express";
import { ObjectId } from "mongoose";

export type TokenData= {
  user_id: ObjectId,
  role: string
};

export interface AuthRequest extends Request {
  tokenData:TokenData
}
