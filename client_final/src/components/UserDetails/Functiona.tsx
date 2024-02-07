import { useQuery } from "react-query";
import {User} from '../../../../../Types/User'
import Cookies from "js-cookie";

export const getUserDetails = async () => {

    try {
        const response = await fetch(`http://localhost:3000/user/get_user_details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('token')}`
            },
        });

        const data = await response.json();
        return data
        // console.log('Data from server:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export const useUserDetailsQuery = () => {
    return useQuery<User | null, Error>('UserDetails', getUserDetails);
};