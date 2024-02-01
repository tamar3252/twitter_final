import { AuthRequest } from 'requestInterface';
import { checkPassword, createToken } from '../Funcs';
import * as userRepository from './Users.repository';
import { Request } from "express";
import { Document, ObjectId, Types, UpdateWriteOpResult } from 'mongoose';
import { User } from '../../../Types/User';

const ObjectId = require('mongoose').ObjectID;



export const signup = async (req: Request) => {
    const response :User= await userRepository.addUser(req.body)
    if (!response)
        return { status: 500, value: response }
    let token:string = createToken(response._id, response.role);
    return { status: 200, value: { token: `${token}`, response } }
    // res.header('Authorization', `${token}`).json({{ token: `Bearer ${token}`, user },code:111});
}
export const login = async (req: Request) => {
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
export const getUserDetails = async (req: AuthRequest): Promise<{ status: number; value: User | string }> => {
    const userId:ObjectId= req.tokenData.user_id;
    const user:User = await userRepository.findUserById(userId)
    if (!user) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: user }
}
export const addFollower = async (req: AuthRequest) => {


    const userId :ObjectId= req.tokenData.user_id;
    const userToFollowId :ObjectId=new ObjectId(req.params.follow_id);

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
export const removeFollower = async (req: AuthRequest) => {
    const userId :ObjectId= req.tokenData.user_id;
    const userToFollowId:ObjectId = req.params.follow_id;

    const response:UpdateWriteOpResult = await userRepository.removeFollower(userId, userToFollowId)
    if (!response || response.matchedCount == 0)
        return { status: 401, value: 'user not found' }
    if (response.modifiedCount == 0)
        return { status: 401, value: 'you dont follow this user' }
    return { status: 200, value: 'success' }
}
export const changeToManager = async (req: AuthRequest) => {
    const userId:ObjectId = req.tokenData.user_id;
    const response:User = await userRepository.changeToManager(userId)
    if (!response) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: 'seccess' }
}




