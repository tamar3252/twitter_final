import Cookies from "js-cookie";
import { ObjectId } from "mongoose";

export const addComment=async(tweetId:ObjectId,text:string)=>{      
    try {
        const response = await fetch('http://localhost:3000/tweet/add_comment_to_tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify({tweetId:tweetId,text:text})     
        })
        const res= await response.json();        
        return res
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}