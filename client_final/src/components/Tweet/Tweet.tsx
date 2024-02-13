import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tweet } from '../../../../Types/Tweet';
import { TweetInList } from '../TweetInList/TweetInList';
import { ObjectId } from 'mongoose';
import { toast } from 'react-toastify';
import { getComment } from './Functions';
import { Grid } from '@mui/material';
import { TweetProps } from './Types';

const TweetComp: FC = () => {
    const location = useLocation();
    const [comments, setComments] = useState<Tweet[]>([]);
    const [tweet, setTweet] = useState<Tweet>()

    useEffect(() => {
        const tweet:Tweet = location.state.tweet;
        setTweet(tweet)
        tweet.comments?.forEach(async (commentId: ObjectId) => {
            const comment: string | number | Tweet = await getComment(commentId).catch((err: Error) => toast.error(err.message));
            setComments((prevComments) => [...prevComments, comment as Tweet]);
        });
    }, []);

    return (
        <div>
            {tweet&&<TweetInList tweet={tweet}/>}
            <Grid margin='20px' container justifyContent="center" alignItems="center" >
                {comments?.map((element) => (
                    <Grid item xs={10}>
                        <div key={String(element._id)}>
                            <TweetInList tweet={element} />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>

    );

};

export { TweetComp };
