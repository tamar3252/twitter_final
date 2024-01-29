const { Request: ExpressRequest,respose:ExpressResponse } = require("express") ;
const {TweetManager}=require('./Tweet.manager')

export const TweetController ={
    getAllTweets:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await TweetManager.getAllTweets();
         res.status(respose.status).json(respose.value)
    },
    getTweetsWithFollower:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await TweetManager.getTweetsWithFollower(req);
        res.status(respose.status).json(respose.value)
    },
    getTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.getTweet(req);
        res.status(respose.status).json(respose.value)
    },
    addTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.addTweet(req);
        res.status(respose.status).json(respose.value)
    },
    addComment:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.addComment(req);
        res.status(respose.status).json(respose.value)
    },
    deleteTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.deleteTweet(req);
        res.status(respose.status).json(respose.value)
    },
}




