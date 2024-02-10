import Cookies from "js-cookie";
import { ObjectId } from "mongoose";

export const addLike = async (tweetId: ObjectId): Promise<ObjectId > => {
        const response: Response = await fetch(`http://localhost:3000/like/add_like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify({ tweet_id: tweetId })
        })
        return await response.json();
}

export const removeLike = async (tweetId: ObjectId , likeId: ObjectId ): Promise<void> => {
        const response: Response = await fetch(`http://localhost:3000/like/remove_like/${tweetId}/${likeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            }
        })
        return await response.json();
}