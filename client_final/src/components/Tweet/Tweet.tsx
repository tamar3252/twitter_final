import React, { FC, useState } from 'react'
import { Tweet } from '../../../../Types/Tweet'
import { TweetCopmProps } from './Types'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import { showComments } from './Functions'
import Like from '../Like';
import Comment from '../Comment';


const TweetCopm: FC<TweetCopmProps> = ({ tweet }) => {

    const [comments, setComments] = useState<Tweet[]>([])
    const [displayUserDetailsBox, setDisplayUserDetailsBox] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            <Box sx={{ zIndex: 'tooltip' }}>
                <Grid border={1} margin={2} padding={2} borderRadius={5} boxShadow={2} >
                    <Grid container spacing={1} alignItems="center" >
                        <Grid item>
                            <div onMouseEnter={() => setDisplayUserDetailsBox(true)} onMouseLeave={() => setDisplayUserDetailsBox(false)}>
                                <Avatar src={tweet.user_id.image}
                                    sx={{
                                        width: 40, height: 40, borderRadius: '50%',
                                    }}
                                ></Avatar>
                            </div>
                        </Grid>

                        <Grid item>

                            <Typography variant="body1">{tweet.user_id.full_name.first_name} {tweet.user_id.full_name.last_name}</Typography>
                        </Grid>

                    </Grid>
                    <div style={{ position: 'relative' }}>
                        <Box sx={{ display: displayUserDetailsBox ? 'block' : 'none', zIndex: 'tooltip' }}>
                            <div>{tweet.user_id?.full_name.first_name} {tweet.user_id?.full_name.last_name}</div>
                        </Box>
                    </div>
                    <div onClick={() => {
                        tweet.comments?.forEach(async element => {
                            const comment = await showComments(element)
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