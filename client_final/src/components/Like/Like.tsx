import { Button } from '@mui/material'
import { ObjectId } from 'mongoose'
import React, { FC, useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LikeCopmProps } from './Types'
import { addLike, checkIsLiked, removeLike } from './Functions'
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { getComment } from '../Tweet/Functions';

const Like: FC<LikeCopmProps> = ({ tweet }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likeId, setLikeId] = useState<ObjectId | null>(null)
    const [likesNum, setLikesNum] = useState<number>(tweet.likes ? tweet.likes?.length : 0)

    const setNumLike = async () => {
        const newTweet = await getComment(tweet._id!)
        setLikesNum(newTweet.likes?.length!)
    }

    useEffect(() => {
        setNumLike()
    }, [])

    const mutationAddLike = useMutation<ObjectId, unknown, { tweetId: ObjectId }>({
        mutationFn: async ({ tweetId }) => await addLike(tweetId),
        onSuccess: async (likeId: ObjectId) => {
            setLikeId(likeId);
        },
        onError: () => {
            toast.error('Failed to add like', { position: 'top-right' });
        },
    })

    const mutationRemoveLike = useMutation<void, unknown, { tweetId: ObjectId, likeId: ObjectId }>({
        mutationFn: async ({ tweetId, likeId }) => await removeLike(tweetId, likeId),
        onSuccess: async () => {
            setLikeId(tweet._id as ObjectId);
        },
        onError: () => {
            toast.error('Failed to add like', { position: 'top-right' });
        },
    })

    const likeClick = async (tweetId: ObjectId, liked: boolean, likeId: ObjectId | null, likesNum: number): Promise<void> => {
        !liked ? await mutationAddLike.mutate({ tweetId }) : likeId && await mutationRemoveLike.mutate({ tweetId, likeId });
        liked ? setLikesNum(likesNum - 1) : setLikesNum(tweet.likes ? likesNum + 1 : 1);
        setLiked((prevLiked) => !prevLiked);
    }

    useEffect(() => {
        checkIsLiked(tweet, setLiked, setLikeId).catch((err: Error) => toast.error(err.message))
    }, [])

    return (
        <div>
            <Button onClick={() => likeClick(tweet._id!, liked, likeId, likesNum).catch((err: Error) => toast.error(err.message))}>
                {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                {likesNum}
            </Button>
        </div>
    )
}

export { Like }
