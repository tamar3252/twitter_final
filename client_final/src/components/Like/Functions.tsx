import Cookies from "js-cookie";
import { ObjectId } from "mongoose";

export const addLike = async (tweetId: ObjectId): Promise<ObjectId | undefined> => {
    try {
        const response: Response = await fetch(`http://localhost:3000/like/add_like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
            body: JSON.stringify({ tweet_id: tweetId })
        })
        const data: ObjectId = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export const removeLike = async (tweetId: ObjectId | undefined, likeId: ObjectId | undefined): Promise<void> => {
    try {
        const response: Response = await fetch(`http://localhost:3000/like/remove_like/${tweetId}/${likeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            }
        })
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}