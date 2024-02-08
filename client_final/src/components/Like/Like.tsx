import { Alert, Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { addLike, removeLike } from './Functions'


const Like: FC<LikeCopmProps> = ({ tweet }) => {

    const [likesNum, setLikesNum] = useState(tweet.likes?.length)
    const [liked, setLiked] = useState(false);
    const [likeId, setLikeId] = useState<ObjectId>()

    const handleLikeClick = async (tweetId: ObjectId):Promise<void> => {
        setLikesNum(liked ? tweet.likes?.length : tweet.likes ? tweet.likes?.length + 1 : 1)
        setLiked((prevLiked) => !prevLiked);

        const addFunc = async ():Promise<void> => {
            const id: ObjectId | undefined = await addLike(tweetId);
            id?setLikeId(id):<Alert severity="warning">This is a warning Alert.</Alert>
        }

        const removeFunc = ():void => {
            removeLike(tweetId, likeId)
        }

        !liked ? addFunc() : removeFunc()
    }

    return (
        <div>
            <Button onClick={() => handleLikeClick(tweet._id)}>
                {liked ? <FavoriteIcon color="blue" /> : <FavoriteBorderIcon />}
                {likesNum}
            </Button>
        </div>
    )
}

export { Like }