import React, { FC, useState } from 'react'
import { useUserDetailsQuery } from './Functiona';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { UserCopmProps } from './Types';

const UserDetails:FC<UserCopmProps> = ({ user }) => {
    const { data: userDetails, isLoading: isLoading3, isError: isError3 } = useUserDetailsQuery();

    const [displayUserBox,setDisplayUserBox]=useState(false)

    return (
        <div>
            <Grid container marginBottom={3} spacing={1} alignItems="center">
                        <Grid item>
                            <div
                                onClick={() => setDisplayUserBox(true)}
                                // onMouseLeave={() => setDisplayUserDetailsBox(false)}
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
                                            top: '50px', // Adjust this value as needed
                                            left: '50%', // Adjust this value as needed
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
                                        {/* Add other user details here */}
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