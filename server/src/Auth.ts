import jwt from "jsonwebtoken"
import { config } from "./Config"
import { Request, Response, NextFunction } from "express";
import { AuthRequest, TokenData } from "requestInterface";


export const authUser = (req: AuthRequest, res: Response, next: NextFunction): Response => {
  const authHeader: string = req.headers['authorization'];
  const token: string = authHeader
  if (!token) {
    return res.status(401).json("You need to send token to this endpoint url")
  }
  try {
    const decodeToken: TokenData = (jwt.verify(token, config.tokenSecret)) as TokenData;
    req.tokenData = decodeToken as TokenData
    next();
  }
  catch (err: unknown) {
    return res.status(401).json("Token invalid or expired, log in again")
  }
}