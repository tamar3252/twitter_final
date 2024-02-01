import express, { Router } from "express";
import * as LikeController from './Like.controller';
import { authUser } from '../Auth';

const router:Router = express.Router();

router.post('/add_like',authUser,LikeController.addLike)
router.post('/remove_like',authUser,LikeController.removeLike)

// module.exports = routerTweet;
export default router