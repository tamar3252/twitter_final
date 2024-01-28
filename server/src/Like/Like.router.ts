const express = require("express")
const {LikeCtrl}=require('./Like.controller')
const {authUser} =require('../Auth')

const router = express.Router();

router.post('/add_like',authUser,LikeCtrl.addLike)
router.post('/remove_like',authUser.removeLike)

// module.exports = routerTweet;
export default router