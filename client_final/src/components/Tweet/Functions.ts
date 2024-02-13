import { ObjectId } from "mongoose";
import { Tweet } from "../../../../Types/Tweet";

export const getComment = async (tweetId: ObjectId):Promise<Tweet> => {//change to query
        const response:Response = await fetch(`http://localhost:3000/tweet/tweet/${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
}