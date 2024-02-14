import React, { FC } from 'react'
import { TweetInListProps } from './Types'
import { Box, Grid, Typography } from '@mui/material'
import Like from '../Like';
import Comment from '../Comment';
import { User } from '../../../../Types/User'
import UserDetails from '../UserDetails'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const TweetInList: FC<TweetInListProps> = ({ tweet }) => {
    const nav: NavigateFunction=useNavigate()

    return (
        <div >
            <Box >
                <Grid  padding={2} boxShadow={2} style={{ position: 'relative' }}>
                    <UserDetails user={tweet.user_id as unknown as User} isConnectedUser={false}></UserDetails>
                    <div >
                        <Typography onClick={()=>nav(`/tweet/${tweet._id}`,{ state: { tweet } })} fontSize={20}>{tweet.text}</Typography>
                        {tweet.dateCreated && new Date(tweet.dateCreated).toLocaleDateString()} {tweet.dateCreated &&new Date(tweet.dateCreated).toLocaleTimeString()}              
                              </div>
                    <Grid container  spacing={1} alignItems="center" marginTop={3} justifyContent="space-around">
                        <Like tweet={tweet}></Like>
                        <Comment tweet={tweet}></Comment>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export { TweetInList }