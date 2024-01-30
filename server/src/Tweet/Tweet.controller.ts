const { Request: ExpressRequest,respose:ExpressResponse } = require("express") ;
const {TweetManager}=require('./Tweet.manager')

export const TweetController ={
    getAllTweets:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await TweetManager.getAllTweets().catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
         res.status(respose.status).json(respose.value)
    },
    getTweetsWithFollower:async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await TweetManager.getTweetsWithFollower(req).catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
        res.status(respose.status).json(respose.value)
    },
    getTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.getTweet(req).catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
        res.status(respose.status).json(respose.value)
    },
    addTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.addTweet(req).catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
        res.status(respose.status).json(respose.value)
    },
    addComment:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.addComment(req).catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
        res.status(respose.status).json(respose.value)
    },
    deleteTweet:async (req:typeof ExpressRequest,res:typeof ExpressResponse) => {
        const respose =await TweetManager.deleteTweet(req).catch((err:Error) => {        
            return { status: 500, value: err.message }
        })
        res.status(respose.status).json(respose.value)
    },
}




