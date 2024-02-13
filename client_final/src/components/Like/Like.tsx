import { Alert, Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { addLike, checkIsLiked, removeLike } from './Functions'
import { toast } from 'react-toastify';
import { Like as likeType } from '../../../../Types/Like';

const Like: FC<LikeCopmProps> = ({ tweet }) => {

    const [liked, setLiked] = useState<boolean>();
    const [likeId, setLikeId] = useState<ObjectId>()
    const [likesNum, setLikesNum] = useState(tweet.likes ? tweet.likes?.length : 0)

    useEffect(() => {
        checkIsLikedFunc();
    }, [])

    const checkIsLikedFunc = async () => {
        const like: likeType = await checkIsLiked(tweet._id!)
        like ? (setLiked(true), setLikeId(like._id)) : setLiked(false)
    }

    const add = async (tweetId: ObjectId): Promise<void> => {
        const id: ObjectId | string | number = await addLike(tweetId).catch((err: Error) => toast.error(err.message))
        setLikeId(id as ObjectId)
    };

    const remove = async (tweetId: ObjectId): Promise<void> => {
        likeId && await removeLike(tweetId, likeId).catch((err: Error) => toast.error(err.message))
    };

    const likeClick = async (tweetId: ObjectId): Promise<void> => {
        liked ? setLikesNum(likesNum - 1) : setLikesNum(tweet.likes ? likesNum + 1 : 1);

        setLiked((prevLiked) => !prevLiked);
        !liked ? add(tweetId) : remove(tweetId);
    };


    return (
        <div>
            <Button onClick={() => likeClick(tweet._id!)}>
                {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                {likesNum}
            </Button>
        </div>
    )
}

export { Like }