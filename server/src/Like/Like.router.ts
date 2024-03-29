import express, { Router } from "express";
import * as LikeController from './Like.controller';
import { authUser } from '../Auth';

const router:Router = express.Router();

router.post('/add_like',authUser,LikeController.addLike)
router.delete('/remove_like/:like_id',authUser,LikeController.removeLike)

module.exports = router;
export default router