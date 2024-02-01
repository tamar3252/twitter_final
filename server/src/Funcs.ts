import  bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"
const {config} = require("./Config")

export const checkPassword=async(reqPassword:string,userPassword:string):Promise<boolean> =>{    
    return await bcrypt.compare(reqPassword,userPassword)
}

export const createToken = (user_id:ObjectId, role:string):string => { 
    const token:string = jwt.sign({ user_id, role }, config.tokenSecret, { expiresIn: "60mins" });
    return token;
  }
  