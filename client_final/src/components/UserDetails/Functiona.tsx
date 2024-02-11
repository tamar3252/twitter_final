import { useQuery } from "react-query";
import {User} from '../../../../Types/User'
import Cookies from "js-cookie";

export const getUserDetails = async ():Promise<User> => {
        const response:Response = await fetch(`http://localhost:3000/user/get_user_details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
        });
       return await response.json();
}


export const useUserDetailsQuery = () => {
    return useQuery<User>('UserDetails', getUserDetails);
};