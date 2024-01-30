const expressTweet = require("express")
const TweetController=require('./Tweet.controller')
const {authUser} =require('../Auth')
const tweetValidation=require('./Tweet.validator')


const routerTweet = expressTweet.Router();

routerTweet.get("/all_tweets",TweetController.getAllTweets)
routerTweet.get("/tweet",TweetController.getTweet)
routerTweet.get("/tweets_with_follower",authUser,TweetController.getTweetsWithFollower)
routerTweet.post("/add_tweet",tweetValidation.tweetValidation, authUser,TweetController.addTweet)
routerTweet.post("/add_comment_to_tweet",tweetValidation.commentValidation,authUser,TweetController.addComment)
routerTweet.delete("/delete_tweet/:tweet_id",tweetValidation.tweetIdValidation,authUser,TweetController.deleteTweet)

module.exports = routerTweet;
export default routerTweet;