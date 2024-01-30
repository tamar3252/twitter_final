import  jwt from "jsonwebtoken"
import { config } from "./Config"
import { Request , Response , NextFunction  } from "express";

interface  AuthRequest extends Request {
  tokenData: any 
}

export const authUser = (req: AuthRequest, res:  Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader
  if (!token) {
    return res.status(401).json("You need to send token to this endpoint url")
  }
  try {
    const decodeToken = jwt.verify(token, config.tokenSecret);

    req.tokenData = decodeToken;
    next();
  }
  catch (err) {
    return res.status(401).json("Token invalid or expired, log in again")
  }
}