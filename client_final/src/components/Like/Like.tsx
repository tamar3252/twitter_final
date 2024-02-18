import { Alert, Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { addLike, checkIsLiked, removeLike } from './Functions'
import { likeContext } from '../Context'
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

const Like: FC<LikeCopmProps> = ({ tweet }) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [likeId, setLikeId] = useState<ObjectId | null>(null)
    const [likesNum, setLikesNum] = useState<number>(tweet.likes ? tweet.likes?.length : 0)

    const mutationAddLike = useMutation<ObjectId, unknown, {  tweetId: ObjectId}>({
        mutationFn: ({ tweetId }) => addLike(tweetId),
        onSuccess: async (likeId: ObjectId) => {
            setLikeId(likeId);
        },
        onError: () => {
            toast.error('Failed to add like', { position: 'top-right' });
        },
    })
    
    const mutationRemoveLike = useMutation<void, unknown, { tweetId: ObjectId, likeId: ObjectId}>({
        mutationFn: ({ tweetId,likeId }) => removeLike(tweetId,likeId),
        onSuccess: async () => {
            setLikeId(tweet._id as ObjectId );
        },
        onError: () => {
            toast.error('Failed to add comment', { position: 'top-right' });
        },
    })

    const likeClick = async (tweetId: ObjectId, liked: boolean, likeId: ObjectId | null, likesNum: number): Promise<void> => {
        liked ? setLikesNum(likesNum - 1) : setLikesNum(tweet.likes ? likesNum + 1 : 1);
        setLiked((prevLiked) => !prevLiked);
        !liked ? await mutationAddLike.mutate({tweetId}) :likeId&& await mutationRemoveLike.mutate({tweetId, likeId}); 
    }

    useEffect(() => {
        checkIsLiked(tweet,setLiked,setLikeId).catch((err:Error)=>toast.error(err.message))
    }, [])

    return (
        <likeContext.Provider value={{ liked, setLiked, likeId, setLikeId, likesNum, setLikesNum }}>
            <div>
                <Button onClick={() => likeClick(tweet._id!, liked, likeId, likesNum).catch((err:Error)=>toast.error(err.message))}>
                    {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    {likesNum}
                </Button>
            </div>
        </likeContext.Provider>
    )
}

export { Like }
