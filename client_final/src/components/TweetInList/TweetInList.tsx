import React, { FC, useContext, useEffect, useState } from 'react'
import { TweetInListProps } from './Types'
import { Box, Grid, Typography } from '@mui/material'
import Like from '../Like';
import Comment from '../Comment';
import { User } from '../../../Types/User'
import UserDetails from '../UserDetails'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { UserDetailsContext } from '../Context';
import { Button } from '@mui/material';
import { deleteTweenFunc } from './Functions';
import DeleteIcon from '@mui/icons-material/Delete';


const TweetInList: FC<TweetInListProps> = ({ tweet,setIsChanged }) => {
    const { userDetails } = useContext(UserDetailsContext)
    const nav: NavigateFunction = useNavigate()
    
    return (
        <div >
            <Box >
                <Grid padding={2} boxShadow={2} style={{ position: 'relative' }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <UserDetails user={tweet.user_id as unknown as User} isConnectedUser={false}></UserDetails>
                        </Grid>
                        <Grid item >
                            <Typography>{(tweet.user_id as unknown as User)?.full_name.first_name} {(tweet.user_id as unknown as User)?.full_name.last_name}</Typography>
                        </Grid>
                    </Grid>
                    <div >
                        <Typography onClick={() => nav(`/tweet/${tweet._id}`, { state: { tweet, userDetails } })} fontSize={20}>{tweet.text}</Typography>
                        {tweet.dateCreated && new Date(tweet.dateCreated).toLocaleDateString()} {tweet.dateCreated && new Date(tweet.dateCreated).toLocaleTimeString()}
                    </div>
                    <Grid container spacing={1} alignItems="center" marginTop={3} justifyContent="space-around">
                        <Like tweet={tweet} ></Like>
                        <Comment tweet={tweet} setIsChanged={setIsChanged}></Comment>
                        {(userDetails?._id == (tweet.user_id as unknown as User)?._id || userDetails?.role == 'manager') &&
                            <Button onClick={() => deleteTweenFunc(tweet._id!,setIsChanged)
                            }><DeleteIcon color='primary'></DeleteIcon></Button>
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export { TweetInList }