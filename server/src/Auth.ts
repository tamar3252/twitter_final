const jwt = require("jsonwebtoken");
const {config} = require("./Config")
const { Request: authRequest,respose:authResponse ,next:authNext} = require("express") ;


export const authUser = (req:typeof authRequest,res: typeof authResponse,next:typeof authNext) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader
  if(!token){
    return res.status(401).json({data:"You need to send token to this endpoint url"})
  }
  try{
    
    let decodeToken = jwt.verify(token, config.tokenSecret);    
    req.tokenData = decodeToken;
    next();
  }
  catch(err){
    return res.status(401).json({data:"Token invalid or expired, log in again"})
  }
}