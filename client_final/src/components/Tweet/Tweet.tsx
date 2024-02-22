import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
            await setComments((prevComments) => [...prevComments, comment as Tweet])     
        },
        onError: () => {
            toast.error('Failed to login', { position: 'top-right' });
        },
    });
    const { tweet_id  } = useParams<{ tweet_id: string  }>();

    
const getComments=async()=>{
    const tweet2 =await getComment(tweet_id as unknown as ObjectId)
    await setTweet(tweet2)    
    await tweet2&&tweet2.comments?.forEach(async (commentId: ObjectId) => {
        await mutationGetComment.mutate({tweetId:commentId});
   })

}
    useEffect(() => {
        setComments([])        
        getComments()          
    }, [tweet_id])

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
