import { Request, Response   } from "express";
import { Add, Remove } from "../../../Types/Like";
const LikeManager = require('./Like.manager')

export const addLike = async (req: Request, res: Response):Promise<void> => {
    const respose:Add = await LikeManager.addLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const removeLike = async (req: Request, res: Response):Promise<void> => {
    const respose:Remove = await LikeManager.removeLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}





