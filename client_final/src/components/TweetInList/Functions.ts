import { ObjectId } from "mongoose";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

export const deleteTweet = async (tweetId: ObjectId):Promise<Response> => {
    const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/tweet/delete_tweet/${tweetId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
    });    
    return await response;
}

export const deleteTweenFunc=async(tweetId:ObjectId,setIsChanged:React.Dispatch<React.SetStateAction<boolean>>)=>{
    const res:Response=await deleteTweet(tweetId).catch((err: Error) => toast.error(err.message))
    !res.ok&& toast.error(await res.json())
    setIsChanged(true)
}
