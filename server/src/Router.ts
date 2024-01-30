import{ Express } from 'express';
const usersRoute = require("./Users/Users.router");
const tweetRoute = require("./Tweet/Tweet.router");
const likeRoute=require('./Like/Like.router')

export const routesInit = (app:Express) => {
  app.use("/user",usersRoute)
  app.use("/tweet",tweetRoute)
  // app.use("/like",likeRoute)
}