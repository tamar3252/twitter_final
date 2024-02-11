import React, { FC, useState } from 'react'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopmProps } from './Types'
import { Box,  Grid,  Typography } from '@mui/material'
import { getComment } from './Functions'
import Like from '../Like';
import Comment from '../Comment';
import { User } from '../../../../Types/User'
import UserDetails from '../UserDetails'
import { toast } from 'react-toastify'

const TweetCopm: FC<TweetCopmProps> = ({ tweet }) => {

    const [comments, setComments] = useState<Tweet[]>([])

    return (

        <div >
            <Box >
                <Grid border={1} margin={2} padding={2} borderRadius={5} boxShadow={2} style={{ position: 'relative' }}>

                    <UserDetails user={tweet.user_id as User}></UserDetails>

                    <div onClick={() => {
                        tweet.comments?.forEach(async commentId => {
                            const comment: string | number | Tweet[] = await getComment(commentId).catch((err: Error) => toast.error(err.message))
                            comments ? setComments((prevComments) => [...prevComments, comment]) : setComments([comment])
                        })
                    }
                    }>
                        <Typography fontSize={20}>{tweet.text}</Typography>
                    </div>


                    <Grid container spacing={1} alignItems="center" marginTop={3} justifyContent="space-around">
                        <Like tweet={tweet}></Like>
                        <Comment tweet={tweet}></Comment>
                    </Grid>

                    {comments?.map(element => (
                        <div key={element._id}>
                            <TweetCopm tweet={element} />
                        </div>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export { TweetCopm }