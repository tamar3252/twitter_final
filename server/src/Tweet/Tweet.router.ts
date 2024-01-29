const expressTweet = require("express")
const {TweetController}=require('./Tweet.controller')
const {authUser} =require('../Auth')


const routerTweet = expressTweet.Router();

routerTweet.get("/all_tweets",TweetController.getAllTweets)//also for guest
routerTweet.get("/tweets_with_follower",authUser,TweetController.getTweetsWithFollower)
routerTweet.get("/tweet",TweetController.getTweet)//also for guest
routerTweet.post("/add_tweet",authUser,TweetController.addTweet)
routerTweet.post("/add_comment_to_tweet",authUser,TweetController.addComment)
routerTweet.delete("/delete_tweet/:tweet_id",authUser,TweetController.deleteTweet)

module.exports = routerTweet;
export default routerTweet