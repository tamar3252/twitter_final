const { loginValidation, userValidation } = require("./Users.validator");
const { checkPassword, createToken } = require('../Funcs')
const { findUserByEmail,findUserById, addUser, addFollower,removeFollower, changeToManager } = require('./Users.repository')
const { Request: ExpressRequest} = require("express");

export const signupFunc = async (req: typeof ExpressRequest) => {
    let validBody = userValidation(req.body);
    if (validBody.error) {

        return { status: 400, value: { data: "ERROR: invalid comment details " + validBody.error.details[0].message } }
    }
    try {
        const user = await addUser(req.body)
        let token = createToken(user._id, user.role);
        return { status: 200, value: { data: { token: `Bearer ${token}`, user } } }
        // res.header('Authorization', `Bearer ${token}`).json({data:{ token: `Bearer ${token}`, user },code:111});
    }

    catch (err) {
        if (err.code == 11000) {
            return { status: 500, value: { data: "ERROR: user name or email already in system, try log in" } }
        }
        return { status: 500, value: { data: err.message } }
    }
}

export const loginFunc = async (req: typeof ExpressRequest) => {
    let validBody = loginValidation(req.body);
    if (validBody.error) {
        return { status: 400, value: { data: "ERROR: invalid comment details " + validBody.error.details[0].message } }
    }
    try {
        const user = await findUserByEmail(req.body.email)

        if (!user) {
            return { status: 401, value: { data: "ERROR: wrong user name or password" } }
        }

        let authPassword = await checkPassword(req.body.password, user.password);
        if (!authPassword) {
            return { status: 401, value: { data: "ERROR: wrong user name or password" } }
        }
        let token = createToken(user._id, user.role)
        return { status: 200, value: { data: { token: `Bearer ${token}`, user } } }
        //   res.header('Authorization', `Bearer ${token}`).json({data:{ token: `Bearer ${token}`, user }});    
    }
    catch (err) {
        return { status: 500, value: { data: err.message } }
    }
}

export const getUserDetailsFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    try {
        const user = await findUserById(userId)
        if (!user) {
            return { status: 400, value: { data: "ERROR: user not found" } }
        }
        return { status: 200, value: { data: user } }
    }
    catch (err) {
        return { status: 500, value: { data: err.message } }
    }
}


export const addFollowerFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const userToFollowId = req.params.follow_id;

    if (userToFollowId==undefined) {
        return { status: 400, value: { data: "ERROR: invalid comment details ,send follow id"  } }
    }

    try {
        const response = await addFollower(userId, userToFollowId)
        if (response.matchedCount == 0)
            return { status: 400, value: { data: 'user id not found' } }
        if (response.modifiedCount == 0)
            return { status: 400, value: { data: 'you already follow this user' } }
        return { status: 200, value: { data: 'success' } }
    }
    catch (err) {
        return { status: 500, value: { data: err.message } }

    }
}

export const removeFollowerFunc = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const userToFollowId = req.params.follow_id;

    if (userToFollowId==undefined) {
        return { status: 400, value: { data: "ERROR: invalid comment details ,send follow id"  } }
    }

    try {        
        const response =await removeFollower(userId, userToFollowId)        
        if (response.matchedCount == 0)
            return { status: 400, value: { data: 'user id not found' } }
        if (response.modifiedCount == 0)
            return { status: 400, value: { data: 'you dont follow this user' } }
        return { status: 200, value: { data: 'success' } }
    }
    catch (err) {
        return { status: 500, value: err.message }
    }
}

export const changeToManagerFunc = (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    try {
        const response = changeToManager(userId)
        if (!response) {
            return { status: 400, value: { data: response } }
        }
        return { status: 200, value: { data: 'seccess' } }
    }
    catch (err) {
        return { status: 500, value: { data: err.message } }
    }
}

