import { AuthRequest } from 'requestInterface';
import { checkPassword, createToken } from '../Funcs';
import * as userRepository from './Users.repository';
import { Request } from "express";
import { Document, ObjectId, Types, UpdateWriteOpResult } from 'mongoose';
import {  GetUserDetails,  UserLogin, UserSignup, UpdateUser, User } from '../../../Types/User';
import { UserModel } from 'Models/UserModel';

const ObjectId = require('mongoose').ObjectID;



export const signup = async (req: Request):Promise<UserSignup>  => {
    const user :User= await userRepository.addUser(req.body)
    if (!user)
        return { status: 500, value: user }
    let token:string = createToken(user._id, user.role);
    return { status: 200, value: { token: `${token}`, user } }
    // res.header('Authorization', `${token}`).json({{ token: `Bearer ${token}`, user },code:111});
}
export const login = async (req: Request):Promise<UserLogin> => {
    const user:User = await userRepository.findUserByEmail(req.body.email)
    if (!user) {
        return { status: 401, value: "ERROR: wrong user name or password" }
    }
    let authPassword:true|false = await checkPassword(req.body.password, user.password);
    if (!authPassword) {
        return { status: 401, value: "ERROR: wrong user name or password" }
    }
    let token :string= createToken(user._id, user.role)
    return { status: 200, value: { token: `${token}`, user } }
    //   res.header('Authorization', `Bearer ${token}`).json({{ token: `Bearer ${token}`, user }});    
}
export const getUserDetails = async (req: AuthRequest): Promise<GetUserDetails> => {
    const userId:ObjectId= req.tokenData.user_id;
    const user:User = await userRepository.findUserById(userId)
    if (!user) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: user }
}

export const addFollower = async (req: AuthRequest):Promise<UpdateUser>  => {

    const userId :ObjectId= req.tokenData.user_id;
    const userToFollowId :ObjectId=req.params.follow_id

    const userToFollow = await userRepository.findUserById(userToFollowId)
    if (!userToFollow)
        return { status: 401, value: 'user to follow not found' }

    const response:UpdateWriteOpResult = await userRepository.addFollower(userId, userToFollowId)
    if (!response || response.matchedCount == 0)
        return { status: 401, value: 'user not found' }
    if (response.modifiedCount == 0)
        return { status: 401, value: 'you already follow this user' }
    return { status: 200, value: 'success' }
}


export const removeFollower = async (req: AuthRequest):Promise<UpdateUser> => {
    const userId :ObjectId= req.tokenData.user_id;
    const userToFollowId:ObjectId = req.params.follow_id;

    const response:UpdateWriteOpResult = await userRepository.removeFollower(userId, userToFollowId)
    if (!response || response.matchedCount == 0)
        return { status: 401, value: 'user not found' }
    if (response.modifiedCount == 0)
        return { status: 401, value: 'you dont follow this user' }
    return { status: 200, value: 'success' }
}
export const getFollower = async (req: AuthRequest):Promise<GetUserDetails> => {
    const userId :ObjectId= req.tokenData.user_id;
    const userToFollowId:ObjectId = req.params.follow_id;
    const user:User = await userRepository.getFollower(userId, userToFollowId)
    return { status: 200, value: user }
}
export const changeToManager = async (req: AuthRequest) :Promise<UpdateUser>=> {
    const userId:ObjectId = req.tokenData.user_id;
    const response:User = await userRepository.changeToManager(userId)
    if (!response) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: 'seccess' }
}





