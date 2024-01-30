const { Request: ExpressRequest, respose: ExpressResponse } = require("express");
const LikeManager = require('./Like.manager')

export const addLike = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await LikeManager.addLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}
export const removeLike = async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    const respose = await LikeManager.removeLike(req).catch((err: Error) => {
        return { status: 500, value: err.message }
    })
    res.status(respose.status).json(respose.value)
}





