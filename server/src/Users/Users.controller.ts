const {userManager } = require('./Users.manager')
const { Request: ExpressRequest,respose:ExpressResponse } = require("express") ;

export const userController = {
    login: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.login(req);
        res.status(respose.status).json(respose.value)
    },
    signup: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.signup(req);
        res.status(respose.status).json(respose.value)
    },
    getUserDetails: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.getUserDetails(req);
        res.status(respose.status).json(respose.value)
    },
    addFollower: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.addFollower (req);
        res.status(respose.status).json(respose.value)
    },
    removeFollower: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.removeFollower (req);
        res.status(respose.status).json(respose.value)
    },
    changeToManager: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await userManager.changeToManager (req);
        res.status(respose.status).json(respose.value)
    }

}
