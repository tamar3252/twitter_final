const { checkPassword, createToken } = require('../Funcs')
const  userRepository  = require('./Users.repository')
const { Request: ExpressRequest } = require("express");


export const signup = async (req: typeof ExpressRequest) => {
    const response = await userRepository.addUser(req.body)
    if (!response)
        return { status: 500, value: response }
    let token = createToken(response._id, response.role);
    return { status: 200, value: { token: `${token}`, response } }
    // res.header('Authorization', `${token}`).json({{ token: `Bearer ${token}`, user },code:111});
}
export const login = async (req: typeof ExpressRequest) => {
    const user = await userRepository.findUserByEmail(req.body.email)
    if (!user) {
        return { status: 401, value: "ERROR: wrong user name or password" }
    }
    let authPassword = await checkPassword(req.body.password, user.password);
    if (!authPassword) {
        return { status: 401, value: "ERROR: wrong user name or password" }
    }
    let token = createToken(user._id, user.role)
    return { status: 200, value: { token: `${token}`, user } }
    //   res.header('Authorization', `Bearer ${token}`).json({{ token: `Bearer ${token}`, user }});    
}
export const getUserDetails = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const user = await userRepository.findUserById(userId)
    if (!user) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: user }
}
export const addFollower = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const userToFollowId = req.params.follow_id;

    const userToFollow = await userRepository.findUserById(userToFollowId)
    if (!userToFollow)
        return { status: 401, value: 'user to follow not found' }

    const response = await userRepository.addFollower(userId, userToFollowId)
    if (!response || response.matchedCount == 0)
        return { status: 401, value: 'user not found' }
    if (response.modifiedCount == 0)
        return { status: 401, value: 'you already follow this user' }
    return { status: 200, value: 'success' }
}
export const removeFollower = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const userToFollowId = req.params.follow_id;

    const response = await userRepository.removeFollower(userId, userToFollowId)
    if (!response || response.matchedCount == 0)
        return { status: 401, value: 'user not found' }
    if (response.modifiedCount == 0)
        return { status: 401, value: 'you dont follow this user' }
    return { status: 200, value: 'success' }
}
export const changeToManager = async (req: typeof ExpressRequest) => {
    const userId = req.tokenData.user_id;
    const response = await userRepository.changeToManager(userId)
    if (!response) {
        return { status: 401, value: "ERROR: user not found" }
    }
    return { status: 200, value: 'seccess' }
}




