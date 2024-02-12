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
    const [likesNum, setLikesNum] = useState(tweet.likes?.length)

    useEffect(() => {
        checkIsLikedFunc();
    }, []) 


    const checkIsLikedFunc = async () => {
        const like:likeType = await checkIsLiked(tweet._id)
        like ? (setLiked(true), setLikeId(like._id)) : setLiked(false)
    }

    const likeClick = async (tweetId: ObjectId): Promise<void> => {
        setLikesNum(liked ? likesNum - 1 : tweet.likes ? likesNum + 1 : 1)
        setLiked((prevLiked) => !prevLiked);

        const add = async (): Promise<void> => {
            await addLike(tweetId).then((id: ObjectId) => setLikeId(id))
                .catch((err: Error) =>
                    toast.error(err.message))
        }

        const remove = async (): Promise<void> => {
            likeId && await removeLike(tweetId, likeId)
                .catch((err: Error) =>
                    toast.error(err.message))
        }

        !liked ? add() : remove()
    }

    return (
        <div>
            <Button onClick={() => likeClick(tweet._id)}>
                {liked ? <FavoriteIcon color="blue" /> : <FavoriteBorderIcon />}
                {likesNum}
            </Button>
        </div>
    )
}

export { Like }