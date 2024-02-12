
import { Request, Response } from "express";
import { AddLike, GetLike, RemoveLike } from "../../../Types/Like";
const LikeManager = require('./Like.manager')

export const addLike = async (req: Request, res: Response):Promise<void> => {
    const respose:AddLike = await LikeManager.addLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}

export const removeLike = async (req: Request, res: Response):Promise<void> => {
    const respose:RemoveLike = await LikeManager.removeLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}

export const getLike = async (req: Request, res: Response): Promise<void> => {
    const respose: GetLike = await LikeManager.getLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })    
    res.status(respose.status).json(respose.value)
}





