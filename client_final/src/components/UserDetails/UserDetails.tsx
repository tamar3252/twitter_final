import React, { FC, useEffect, useState } from 'react'
import { addFollow, changeToManager, checkIsFollow, checkIsFollowFunc, getAllFollows, getAllFollowsFunc, removeFollow } from './Functiona';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { UserCopmProps } from './Types';

const UserDetails: FC<UserCopmProps> = ({ user, isConnectedUser }) => {

    const [displayUserBox, setDisplayUserBox] = useState(false)
    const [isFollow, setIsFollow] = useState<boolean | null>(null)
    const [followsNum, setFollowsNum] = useState<number | null>(null)


    useEffect(() => {
        user&&(
            checkIsFollowFunc(user, setIsFollow),
            getAllFollowsFunc(user, setFollowsNum)
        )
    }, [])


    return (
        <div>
            <Grid container marginBottom={3} spacing={1} alignItems="center">
                <Grid item>
                    <div
                        style={{ position: 'relative' }}>
                        <Avatar onClick={() => displayUserBox ? setDisplayUserBox(false) : setDisplayUserBox(true)}
                            src={user?.image || ''}
                            sx={{ width: 40, height: 40, borderRadius: '50%' }}/>

                        {displayUserBox && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50px',
                                    left: '100px',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    zIndex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>

                                <div>
                                    <Grid container>
                                        <Grid item sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                            <Avatar src={user.image} sx={{ width: 65, height: 65, marginRight: '10px' }} />
                                            <Typography sx={{ marginBottom: '5px' }}>
                                                {user.full_name.first_name} {user.full_name.last_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                        {user.follows?user.follows?.length:0} following
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                        {followsNum} followers
                                    </Typography>
                                    {!isConnectedUser ?
                                        <Button onClick={() => isFollow ? (removeFollow(user._id!), setIsFollow(false)) : (addFollow(user._id!), setIsFollow(true))}>
                                            {isFollow ? 'Unfollow' : 'Follow'}
                                        </Button> :
                                        (user.role == 'admin' ?
                                            <Typography variant="body1" sx={{ color: 'gray', marginBottom: '10px' }}>
                                                {user.role} 
                                            </Typography> :
                                            <Button onClick={changeToManager}>become to manager</Button>
                                        )
                                    }
                                </div>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export { UserDetails }