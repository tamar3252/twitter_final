const { Request: ExpressRequest, respose: ExpressResponse } = require("express");
const { addLikeFunc, removeLikeFunc } = require('./Like.manager')

export const LikeCtrl = {
    addLike: async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
        const respose = await addLikeFunc(req);
        res.status(respose.status).json(respose.value)
    },
    removeLike: async (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
        const respose = await removeLikeFunc(req);
        res.status(respose.status).json(respose.value)
    }
}




