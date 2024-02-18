import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tweet } from '../../../../Types/Tweet';
import { TweetInList } from '../TweetInList/TweetInList';
import { ObjectId } from 'mongoose';
import { toast } from 'react-toastify';
import { getComment } from './Functions';
import { Grid } from '@mui/material';
import { map } from 'lodash';
import { useMutation } from 'react-query';

const TweetComp: FC<{}> = ({ }) => {
    const location = useLocation()
    const [comments, setComments] = useState<Tweet[]>([]);
    const [tweet, setTweet] = useState<Tweet>()

    const mutationGetComment = useMutation<void, unknown, { tweetId: ObjectId }>({
        mutationFn: ({ tweetId }) => getComment(tweetId),
        onSuccess: async (comment) => {
            setComments((prevComments) => [...prevComments, comment as Tweet])     
        },
        onError: () => {
            toast.error('Failed to login', { position: 'top-right' });
        },
    });
    

    useEffect(() => {
        const tweet: Tweet = location.state.tweet
        setTweet(tweet)
        tweet.comments?.forEach(async (commentId: ObjectId) => {
             await mutationGetComment.mutate({tweetId:commentId});
        })
    }, [])

    return (
        <div>
            {tweet && <TweetInList tweet={tweet} />}
            <Grid margin='20px' container justifyContent="center" alignItems="center" >
                {map(comments, (element) => (
                    <Grid item xs={10} key={String(element._id)}>
                        <TweetInList tweet={element} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export { TweetComp }
