import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { Like } from '../../../../Types/Like'
import { toast } from "react-toastify";
import { useContext } from "react";
import { likeContext } from "../Context";
import { Tweet } from "../../../../Types/Tweet";
import { Like as likeType } from '../../../../Types/Like';



export const addLike = async (tweetId: ObjectId): Promise<ObjectId> => {
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

export const removeLike = async (tweetId: ObjectId, likeId: ObjectId): Promise<void> => {
    const response: Response = await fetch(`http://localhost:3000/like/remove_like/${tweetId}/${likeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    })
    return await response.json();
}

export const getLike = async (tweetId: ObjectId): Promise<Like> => {

    const response: Response = await fetch(`http://localhost:3000/like/check_is_liked/${tweetId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    })
    return await response.json();
}

const add = async (tweetId: ObjectId, setLikeId: React.Dispatch<React.SetStateAction<ObjectId|null>>): Promise<void> => {
    const id: ObjectId | string | number = await addLike(tweetId).catch((err: Error) => toast.error(err.message))
    setLikeId(id as ObjectId );
};

const remove = async (tweetId: ObjectId, likeId: ObjectId | null): Promise<void> => {
    likeId && await removeLike(tweetId, likeId).catch((err: Error) => toast.error(err.message))
};

export const likeClick = async (tweetId: ObjectId, tweet: Tweet,liked:boolean, setLiked:React.Dispatch<React.SetStateAction<boolean>>, likeId:ObjectId|null, setLikeId:React.Dispatch<React.SetStateAction<ObjectId|null>>, likesNum:number, setLikesNum:React.Dispatch<React.SetStateAction<number>>): Promise<void> => {
    // const context = useContext(likeContext)
    // if (context) {
    //     const { liked, setLiked, likeId, setLikeId, likesNum, setLikesNum } = context;
        liked ? setLikesNum(likesNum - 1) : setLikesNum(tweet.likes ? likesNum + 1 : 1);
        setLiked((prevLiked) => !prevLiked);
        !liked ?await add(tweetId, setLikeId) :await remove(tweetId, likeId); 
    // }
}

export const checkIsLiked = async (tweet:Tweet,setLiked:React.Dispatch<React.SetStateAction<boolean>>,setLikeId:React.Dispatch<React.SetStateAction<ObjectId | null>>) :Promise<void>=> {
    const like: likeType = await getLike(tweet._id!)
    like ? (setLiked(true), setLikeId(like._id!)) : setLiked(false)
}


