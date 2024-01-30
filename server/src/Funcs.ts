import  bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"
const {config} = require("./Config")

export const checkPassword=async(reqPassword:string,userPassword:string)=>{
    return await bcrypt.compare(reqPassword,userPassword)
}

export const createToken = (user_id:string, role:string) => { 
    const token = jwt.sign({ user_id, role }, config.tokenSecret, { expiresIn: "60mins" });
    return token;
  }
  