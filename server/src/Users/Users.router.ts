const expressUser = require("express");
const { userCtrl } = require("./Users.controller");
const {authUser} =require('../Auth')

const routerUser = expressUser.Router();

routerUser.post("/login", userCtrl.login)
routerUser.post("/signup", userCtrl.signup)
routerUser.get("/get_user_details",authUser, userCtrl.getUserDetails)
routerUser.patch("/add_follower/:follow_id",authUser,userCtrl.addFollower)
routerUser.patch("/remove_follower/:follow_id",authUser,userCtrl.removeFollower)
routerUser.patch("/change_to_manager",authUser,userCtrl.changeToManager)

module.exports = routerUser;
