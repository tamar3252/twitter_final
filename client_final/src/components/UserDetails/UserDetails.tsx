import React, { useState } from 'react'
import { useUserDetailsQuery } from './Functiona';
import { Box } from '@mui/material';

const UserDetails = () => {
    const { data: userDetails, isLoading: isLoading3, isError: isError3 } = useUserDetailsQuery();

    const [displayUserBox,setDisplayUserBox]=useState(false)

    return (
        <div>
            <img onClick={()=>{displayUserBox?setDisplayUserBox(false):setDisplayUserBox(true)}}  src={userDetails?.image}></img>
            <Box sx={{ display:displayUserBox ? 'block' : 'none'}}>
                <div>{userDetails?.full_name.first_name} {userDetails?.full_name.last_name}</div>
                <div>{userDetails?.email}</div>
            </Box>
        </div>
    )
}

export { UserDetails }