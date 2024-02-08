import dotenv from "dotenv";
dotenv.config();

export type Config = {
  tokenSecret: string;
  port: string;
};

export const config: Config = {
  tokenSecret: process.env.TOKEN_SECRET,
  port: process.env.PORT
}