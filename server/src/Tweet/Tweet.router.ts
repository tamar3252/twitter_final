import express, { Router } from "express";
import * as TweetController from "./Tweet.controller";
import { authUser } from "../Auth";
import * as tweetValidation from "./Tweet.validator";

const routerTweet:Router = express.Router();

routerTweet.get("/all_tweets",authUser,TweetController.getAllTweets)
routerTweet.get("/tweet/:tweet_id",TweetController.getTweet)
routerTweet.get("/tweets_with_follower",authUser,TweetController.getTweetsWithFollower)
routerTweet.post("/add_tweet",tweetValidation.tweetValidation, authUser,TweetController.addTweet)
routerTweet.post("/add_comment_to_tweet",tweetValidation.commentValidation,authUser,TweetController.addComment)
routerTweet.delete("/delete_tweet/:tweet_id",tweetValidation.tweetIdValidation,authUser,TweetController.deleteTweet)

module.exports = routerTweet;
export default routerTweet;