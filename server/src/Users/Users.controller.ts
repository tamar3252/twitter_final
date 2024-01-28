const { loginFunc,signupFunc,getUserDetailsFunc,addFollowerFunc,removeFollowerFunc,changeToManagerFunc } = require('./Users.manager')
const { Request: ExpressRequest,respose:ExpressResponse } = require("express") ;

export const userCtrl = {
    login: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await loginFunc(req);
        res.status(respose.status).json(respose.value)
    },
    signup: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await signupFunc(req);
        res.status(respose.status).json(respose.value)
    },
    getUserDetails: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await getUserDetailsFunc(req);
        res.status(respose.status).json(respose.value)
    },
    addFollower: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await addFollowerFunc (req);
        res.status(respose.status).json(respose.value)
    },
    removeFollower: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await removeFollowerFunc (req);
        res.status(respose.status).json(respose.value)
    },
    changeToManager: async (req:typeof ExpressRequest, res:typeof ExpressResponse) => {
        const respose =await changeToManagerFunc (req);
        res.status(respose.status).json(respose.value)
    }

}
