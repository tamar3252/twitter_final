import {  Response   } from "express";
import * as userManager from './Users.manager';
import { AuthRequest } from "requestInterface";
import { GetUserDetails, UserLogin, UserSignup, UpdateUser } from "../../../Types/User";


export const login = async (req:AuthRequest, res: Response):Promise<void>=> {
    const respose:UserLogin= await userManager.login(req).catch((err: Error) => {
        return { status: 500, value: err.message||'Internal Server Error' }
    })
    res.status(respose.status).json(respose.value)
}
export const signup = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:UserSignup = await userManager.signup(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getUserDetails = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:GetUserDetails = await userManager.getUserDetails(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const addFollower = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:UpdateUser = await userManager.addFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const removeFollower = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:UpdateUser = await userManager.removeFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const getFollower = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:GetUserDetails = await userManager.getFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const changeToManager = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:UpdateUser = await userManager.changeToManager(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}


