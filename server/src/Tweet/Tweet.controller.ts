const { Request: ExpressRequest,respose:ExpressResponse } = require("express") ;
const {getAllTweetsFunc,getTweetsWithFollowerFunc,getTweetFunc,addTweetFunc,deleteTweetFunc} =require('./Tweet.manager')


export const TweetCtrl ={
    getAllTweets:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await getAllTweetsFunc();
         res.status(respose.status).json(respose.value)
    },
    getTweetsWithFollower:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await getTweetsWithFollowerFunc(req);
        res.status(respose.status).json(respose.value)
    },
    getTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await getTweetFunc();
        res.status(respose.status).json(respose.value)
    },
    addTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await addTweetFunc(req);
        res.status(respose.status).json(respose.value)
    },
    deleteTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await deleteTweetFunc(req);
        res.status(respose.status).json(respose.value)
    },
}




