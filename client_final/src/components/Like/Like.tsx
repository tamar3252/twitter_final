import { Alert, Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { checkIsLiked, likeClick } from './Functions'
import { likeContext } from '../Context'

const Like: FC<LikeCopmProps> = ({ tweet }) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [likeId, setLikeId] = useState<ObjectId | null>(null)
    const [likesNum, setLikesNum] = useState<number>(tweet.likes ? tweet.likes?.length : 0)

    useEffect(() => {
        checkIsLiked(tweet,setLiked,setLikeId)
    }, [])

    return (
        <likeContext.Provider value={{ liked, setLiked, likeId, setLikeId, likesNum, setLikesNum }}>
            <div>
                <Button onClick={() => likeClick(tweet._id!,tweet,liked, setLiked, likeId, setLikeId, likesNum, setLikesNum )}>
                    {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    {likesNum}
                </Button>
            </div>
        </likeContext.Provider>

    )
}

export { Like }