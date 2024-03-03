import { ObjectId } from "mongoose";
import { Tweet } from "../../../Types/Tweet";

export const getComment = async (tweetId: ObjectId):Promise<Tweet> => {
        const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/tweet/${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
}