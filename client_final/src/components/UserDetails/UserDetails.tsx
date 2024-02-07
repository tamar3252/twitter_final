import React from 'react'
import { useUserDetailsQuery } from './Functiona';

const UserDetails = () => {
    const { data: userDetails, isLoading: isLoading3, isError: isError3 } = useUserDetailsQuery();
    console.log('userDetails',userDetails);

    return (
        <div>
            {/* <img onClick={()=>{log}}  src={userDetails?.image}></img> */}
            <div>
                <div>{userDetails?.full_name.first_name} {userDetails?.full_name.last_name}</div>
                <div>{userDetails?.email}</div>

            </div>
        </div>
    )
}

export { UserDetails }