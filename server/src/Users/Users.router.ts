import expressUser, { Router } from "express";
import * as userController from "./Users.controller";
import { authUser } from "../Auth";
import * as userValidation from "./Users.validator";

const routerUser:Router = expressUser.Router();

routerUser.post("/login",userValidation.loginValidation, userController.login)
routerUser.post("/signup",userValidation.signupValidation, userController.signup)
routerUser.get("/get_user_details",authUser, userController.getUserDetails)
routerUser.patch("/add_follower/:follow_id",userValidation.followerIdValidation, authUser,userController.addFollower)
routerUser.patch("/remove_follower/:follow_id",userValidation.followerIdValidation,authUser,userController.removeFollower)
routerUser.get("/get_follower/:follow_id",userValidation.followerIdValidation,authUser,userController.getFollower)

routerUser.patch("/change_to_manager",authUser,userController.changeToManager)

module.exports = routerUser;
