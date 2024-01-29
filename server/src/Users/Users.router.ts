const expressUser = require("express");
const { userController } = require("./Users.controller");
const {authUser} =require('../Auth')
const {userValidation} =require('./Users.validator')

const routerUser = expressUser.Router();

routerUser.post("/login",userValidation.loginValidation, userController.login)
routerUser.post("/signup",userValidation.signupValidation, userController.signup)
routerUser.get("/get_user_details",authUser, userController.getUserDetails)
routerUser.patch("/add_follower/:follow_id",userValidation.followerIdValidation, authUser,userController.addFollower)
routerUser.patch("/remove_follower/:follow_id",userValidation.followerIdValidation,authUser,userController.removeFollower)
routerUser.patch("/change_to_manager",authUser,userController.changeToManager)

module.exports = routerUser;
