import React, { FC, useEffect, useState } from 'react'
import { addFollow, checkIsFollow, removeFollow, useUserDetailsQuery } from './Functiona';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { UserCopmProps } from './Types';
import { User } from '../../../../Types/User';
import { toast } from 'react-toastify';

const UserDetails: FC<UserCopmProps> = ({ user }) => {
    const { data: userDetails, isLoading: isLoading3, isError: isError3 } = useUserDetailsQuery();

    const [displayUserBox, setDisplayUserBox] = useState(false)
    const [isFollow, setIsFollow] = useState<boolean>()


    const checkIsFollowFunc = async () => {
        const res: User | string | number = await checkIsFollow(user._id).catch((err: Error) => toast.error(err.message))
        res ? setIsFollow(true) : setIsFollow(false)
    }

    useEffect(() => {
        checkIsFollowFunc()
    }, [])

    return (
        <div>
            <Grid container marginBottom={3} spacing={1} alignItems="center">
                <Grid item>
                    <div
                        onClick={() => setDisplayUserBox(true)}
                        style={{ position: 'relative' }}
                    >
                        <Avatar
                            src={user?.image || ''}
                            sx={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        {displayUserBox && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50px', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                    padding: '30px',
                                    zIndex: 1,
                                    border: '1px'
                                }}
                            >
                                <Typography variant="body1">
                                    {user.full_name.first_name} {user.full_name.last_name}
                                </Typography>
                                <Button onClick={() => isFollow ? (removeFollow(user._id),setIsFollow(false)):(addFollow(user._id),setIsFollow(true))}>{isFollow ? "unFollow" : "follow"}</Button>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
            {/* <img onClick={()=>{displayUserBox?setDisplayUserBox(false):setDisplayUserBox(true)}}  src={userDetails?.image}></img>
            <Box sx={{ display:displayUserBox ? 'block' : 'none'}}>
                <div>{userDetails?.full_name.first_name} {userDetails?.full_name.last_name}</div>
                <div>{userDetails?.email}</div>
            </Box> */}
        </div>
    )
}

export { UserDetails }