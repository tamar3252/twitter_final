import { UseQueryResult, useQuery } from "react-query";
import {User} from '../../../../Types/User'
import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { toast } from "react-toastify";

export const getUserDetails = async ():Promise<User> => {
        const response:Response = await fetch(`http://localhost:3000/user/get_user_details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
        });
       return await response.json();
}

export const useUserDetailsQuery = ():UseQueryResult<User> => {
    return useQuery<User>('UserDetails', getUserDetails);
};

export const checkIsFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`http://localhost:3000/user/get_follower/${userToFollowId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const addFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`http://localhost:3000/user/add_follower/${userToFollowId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const removeFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`http://localhost:3000/user/remove_follower/${userToFollowId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const getAllFollows = async (userId:ObjectId):Promise<User[]> => {
    const response:Response = await fetch(`http://localhost:3000/user/get_all_followers/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
    });
   return await response.json();
}

export const checkIsFollowFunc = async (user:User,setIsFollow:React.Dispatch<React.SetStateAction<boolean|null>>) => {
    const res: User | string | number = await checkIsFollow(user._id!).catch((err: Error) => toast.error(err.message))
    res ? setIsFollow(true) : setIsFollow(false)
}

export const getAllFollowsFunc = async (user:User,setFollowsNum:React.Dispatch<React.SetStateAction<number|null>>) => {
    const follows = await getAllFollows(user._id!)
    setFollowsNum(follows.length)
}