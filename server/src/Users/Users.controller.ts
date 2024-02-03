import {  Response   } from "express";
import * as userManager from './Users.manager';
import { AuthRequest } from "requestInterface";
import { GetUserDetails, Login, Signup, Update } from "../../../Types/User";


export const login = async (req:AuthRequest, res: Response):Promise<void>=> {
    const respose:Login= await userManager.login(req).catch((err: Error) => {
        return { status: 500, value: err.message||'Internal Server Error' }
    })
    res.status(respose.status).json(respose.value)
}
export const signup = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:Signup = await userManager.signup(req).catch((err: Error) => {
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
    const respose:Update = await userManager.addFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const removeFollower = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:Update = await userManager.removeFollower(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const changeToManager = async (req:AuthRequest, res: Response):Promise<void> => {
    const respose:Update = await userManager.changeToManager(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}


