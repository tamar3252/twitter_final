const express = require("express")
const {LikeController}=require('./Like.controller')
const {authUser} =require('../Auth')

const router = express.Router();

router.post('/add_like',authUser,LikeController.addLike)
router.post('/remove_like',authUser,LikeController.removeLike)

// module.exports = routerTweet;
export default router