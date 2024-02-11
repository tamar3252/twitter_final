import { Alert, Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { addLike, removeLike } from './Functions'
import { toast } from 'react-toastify';

const Like: FC<LikeCopmProps> = ({ tweet }) => {

    const [likesNum, setLikesNum] = useState(tweet.likes?.length)
    const [liked, setLiked] = useState(false);
    const [likeId, setLikeId] = useState<ObjectId>()

    const likeClick = async (tweetId: ObjectId): Promise<void> => {
        setLikesNum(liked ? tweet.likes?.length : tweet.likes ? tweet.likes?.length + 1 : 1)
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