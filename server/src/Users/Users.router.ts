const expressUser = require("express");
const { userController } = require("./Users.controller");
const {authUser} =require('../Auth')

const routerUser = expressUser.Router();

routerUser.post("/login", userController.login)
routerUser.post("/signup", userController.signup)
routerUser.get("/get_user_details",authUser, userController.getUserDetails)
routerUser.patch("/add_follower/:follow_id",authUser,userController.addFollower)
routerUser.patch("/remove_follower/:follow_id",authUser,userController.removeFollower)
routerUser.patch("/change_to_manager",authUser,userController.changeToManager)

module.exports = routerUser;
