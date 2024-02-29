import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Tweet } from '../../../Types/Tweet';
import { TweetInList } from '../TweetInList/TweetInList';
import { ObjectId } from 'mongoose';
import { toast } from 'react-toastify';
import { getComment } from './Functions';
import { Grid } from '@mui/material';
import { map } from 'lodash';
import { useMutation } from 'react-query';
import { UserDetailsContext } from '../Context';

const TweetComp: FC<{}> = ({ }) => {
    const location = useLocation()
    const { userDetails } = location.state;
    const [comments, setComments] = useState<Tweet[]>([]);
    const [tweet, setTweet] = useState<Tweet>()
    const [isChanged, setIsChanged] = useState<boolean>(false)

    const mutationGetComment = useMutation<void, unknown, { tweetId: ObjectId }>({
        mutationFn: async({ tweetId }) => await getComment(tweetId),
        onSuccess: async (comment) => {
            await setComments((prevComments) => [...prevComments, comment as Tweet])
        },
        onError: () => {
            toast.error('Failed', { position: 'top-right' });
        },
    })

    const { tweet_id } = useParams<{ tweet_id: string }>();
    const getComments = async ():Promise<void> => {
        const newTweet:Tweet = await getComment(tweet_id as unknown as ObjectId)
        await setTweet(newTweet)
        await newTweet && newTweet.comments?.forEach(async (commentId: ObjectId) => {
            await mutationGetComment.mutate({ tweetId: commentId });
        })

    }

    useEffect(() => {
        setComments([])
        getComments()
    }, [tweet_id])

    const reRenderComments = async ():Promise<void> => {
        const newTweet:Tweet= await getComment(tweet?._id!)
        await setTweet(newTweet)
        setComments([])
        getComments()
    }


    useEffect(() => {
        tweet&&reRenderComments()
    }, [isChanged])

    return (
        <div>
            <UserDetailsContext.Provider value={{ userDetails }}>
                {tweet && <TweetInList tweet={tweet} setIsChanged={setIsChanged} />}
                <Grid margin='20px' container justifyContent="center" alignItems="center" >
                    {comments.length != 0 && map(comments, (element) => (
                        <Grid item xs={10} key={String(element._id)}>
                            <TweetInList tweet={element} setIsChanged={setIsChanged}/>
                        </Grid>
                    ))}
                </Grid>
            </UserDetailsContext.Provider>
        </div>
    )
}

export { TweetComp }
