import dotenv from "dotenv";
dotenv.config();

export const config = {
  tokenSecret:process.env.TOKEN_SECRET,
  port:process.env.PORT
}