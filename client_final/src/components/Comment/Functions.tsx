import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { Tweet } from "../../../../Types/Tweet";

export const addComment=async(tweetId:ObjectId,text:string):Promise<Tweet>=>{      
        const response:Response = await fetch('http://localhost:3000/tweet/add_comment_to_tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify({tweetId:tweetId,text:text})     
        })
        return await response.json();        
}