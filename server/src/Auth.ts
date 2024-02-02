import jwt from "jsonwebtoken"
import { config } from "./Config"
import { Request, Response, NextFunction } from "express";
import { AuthRequest, TokenData } from "requestInterface";
import { Error } from "mongoose";


export const authUser = (req: AuthRequest, res: Response, next: NextFunction): Response => {
  const authHeader: string = req.headers['authorization'];
  const token: string = authHeader
  if (!token) {
    return res.status(401).json("You need to send token to this endpoint url")
  }
  try {
    const decodeToken: TokenData = (jwt.verify(token, config.tokenSecret)) as TokenData;

    req.tokenData = decodeToken as TokenData
    // req.tokenData={
    //   user_id: (decodeToken as TokenData).user_id,
    //   role: (decodeToken as TokenData).role,

    // };
    next();
  }
  catch (err: unknown) {
    return res.status(401).json("Token invalid or expired, log in again")
  }
}