import {User} from '../../../../Types/User'
import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import { NavigateFunction } from 'react-router-dom';

export const checkIsFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get_follower/${userToFollowId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const addFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/add_follower/${userToFollowId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const removeFollow=async(userToFollowId:ObjectId):Promise<User>=>{
    const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/remove_follower/${userToFollowId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json();
}

export const getAllFollows = async (userId:ObjectId):Promise<User[]> => {
    const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get_all_followers/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        },
    });
   return await response.json();
}

export const changeToManager=async():Promise<void>=>{
    const response:Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/change_to_manager`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`
        }
    });
   return await response.json()

}
export const logout=(navigate:NavigateFunction):void=>{
    Cookies.set('token', "")
    navigate('/')
}