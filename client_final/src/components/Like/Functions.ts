import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { Like } from '../../../../Types/Like'
import { Tweet } from "../../../../Types/Tweet";
import { Like as likeType } from '../../../../Types/Like';



export const addLike = async (tweetId: ObjectId): Promise<ObjectId> => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/like/add_like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
        body: JSON.stringify({ tweet_id: tweetId })
    })
    return await response.json();
}

export const removeLike = async (tweetId: ObjectId, likeId: ObjectId): Promise<void> => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/like/remove_like/${tweetId}/${likeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    })
    return await response.json();
}

export const getLike = async (tweetId: ObjectId): Promise<Like> => {

    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/like/check_is_liked/${tweetId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    })
    return await response.json();
}

export const checkIsLiked = async (tweet:Tweet,setLiked:React.Dispatch<React.SetStateAction<boolean>>,setLikeId:React.Dispatch<React.SetStateAction<ObjectId | null>>) :Promise<void>=> {
    const like: likeType = await getLike(tweet._id!)
    like ? (setLiked(true), setLikeId(like._id!)) : setLiked(false)
}


