const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {config} = require("./Config")

export const checkPassword=async(reqPassword:String,userPassword:String)=>{
    return await bcrypt.compare(reqPassword,userPassword)
}

export const createToken = (user_id:Number, role:String) => {
    console.log(config);
    
    let token = jwt.sign({ user_id, role }, config.tokenSecret, { expiresIn: "60mins" });
    return token;
  }
  