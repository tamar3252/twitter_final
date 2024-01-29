const expressTweet = require("express")
const {TweetCtrl}=require('./Tweet.controller')
const {authUser} =require('../Auth')


const routerTweet = expressTweet.Router();

routerTweet.get("/all_tweets",TweetCtrl.getAllTweets)//also for guest
routerTweet.get("/tweets_with_follower",authUser,TweetCtrl.getTweetsWithFollower)
routerTweet.get("/tweet",TweetCtrl.getTweet)//also for guest
routerTweet.post("/add_tweet",authUser,TweetCtrl.addTweet)//בדיקה אם הכניס טקסט
routerTweet.post("/add_comment_to_tweet",authUser,TweetCtrl.addComment)//בדיקה אם הכניס טקסט
routerTweet.delete("/delete_tweet/:tweet_id",authUser,TweetCtrl.deleteTweet)

module.exports = routerTweet;
export default routerTweet