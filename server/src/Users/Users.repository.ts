import { UserModel } from "../Models/UserModel";
import bcrypt from "bcrypt";
import { Document, ObjectId, UpdateWriteOpResult } from 'mongoose';
import { User } from "../../../Types/User";

export const findUserByEmail = async (email: ObjectId):Promise<User> => {
    return await UserModel.findOne({ email })
}
export const findUserById = async (_id: ObjectId) :Promise<User>=> {
    return await UserModel.findOne({ _id })
}
export const addUser = async (userObj: Object):Promise<User> => {
    let user= await new UserModel(userObj);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "********";
    return user
}
export const addFollower = async (userId: ObjectId, userToFollowId: ObjectId):Promise<UpdateWriteOpResult> => {
    return await UserModel.updateOne({ _id: userId }, { $addToSet: { follows: userToFollowId } })
}
export const removeFollower = async (userId: ObjectId, userToFollowId: ObjectId):Promise<UpdateWriteOpResult>  => {
    return await UserModel.updateOne({ _id: userId, follows: { $in: [userToFollowId] } }, { $pull: { follows: userToFollowId } })
}

export const getFollower= async (userId: ObjectId, userToFollowId: ObjectId):Promise<User>  => {
    return await UserModel.findOne({ _id: userId, follows: { $in: [userToFollowId] } })
}

export const changeToManager = async (userId: ObjectId) => {
    return await UserModel.findOneAndUpdate({ _id: userId }, { role: "manager" })
}

export const getAllFollowers= async (userId: ObjectId,):Promise<User[]>  => {
    return await UserModel.find({  follows: { $in: [userId] } })
}